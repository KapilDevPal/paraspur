import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import { resolve, join, relative } from 'path'
import { execSync } from 'child_process'
import { Header, Footer } from './src/components/layout.js'

const SITE = 'https://paraspur.com'
const DEFAULT_IMAGE = `${SITE}/paraspur-market-banner.jpg`
const SKIP_DIRS = new Set(['node_modules', 'dist', 'public', 'src', 'seo_tools', '.git', '.kilo', '.github'])

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const isNoindex = (html) => /<meta[^>]+name="robots"[^>]+noindex/i.test(html)

export function listHtmlFiles(root, dir = root, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue
    const full = join(dir, name)
    if (statSync(full).isDirectory()) listHtmlFiles(root, full, out)
    else if (name.endsWith('.html')) out.push(relative(root, full))
  }
  return out
}

const canonicalUrl = (file) => {
  if (file === 'index.html') return `${SITE}/`
  return `${SITE}/${file}`
}

const prettyName = (seg) =>
  seg.replace(/\.html$/, '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

const breadcrumbs = (root, file, title) => {
  if (file === 'index.html') return null
  const parts = file.split('/')
  const items = [{ name: 'Home', url: `${SITE}/` }]
  parts.forEach((seg, i) => {
    const last = i === parts.length - 1
    if (last && seg === 'index.html') return
    const url = last ? canonicalUrl(file) : `${SITE}/${parts.slice(0, i + 1).join('/')}/index.html`
    // only link section hubs that really exist, never a 404
    if (!last && !existsSync(join(root, ...parts.slice(0, i + 1), 'index.html'))) return
    items.push({ name: last ? title.split(/\s[-|–]\s/)[0] : prettyName(seg), url })
  })
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it.name, item: it.url,
    })),
  }
}

export function seoPlugin() {
  let root = process.cwd()
  return {
    name: 'paraspur-seo',
    configResolved(cfg) { root = cfg.root },
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const file = relative(root, ctx.filename).split('\\').join('/')
        // Pre-render nav + footer so crawlers see internal links without running JS
        html = html
          .replace('<div id="header-container"></div>', `<div id="header-container">${Header}</div>`)
          .replace('<div id="footer-container"></div>', `<div id="footer-container">${Footer}</div>`)

        const title = (html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || 'Paraspur, Gonda').trim()
        const desc = (html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"/i)?.[1] || '').replace(/\s+/g, ' ').trim()
        const noindex = isNoindex(html)
        const tags = []
        const has = (re) => re.test(html)

        if (!has(/rel="canonical"/i)) tags.push(`<link rel="canonical" href="${canonicalUrl(file)}" />`)
        if (!noindex && !has(/name="robots"/i))
          tags.push('<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />')
        if (!has(/rel="icon"/i)) tags.push('<link rel="icon" type="image/svg+xml" href="/favicon.svg" />')
        if (!has(/name="theme-color"/i)) tags.push('<meta name="theme-color" content="#0d9488" />')
        if (!has(/property="og:title"/i)) {
          tags.push(
            `<meta property="og:type" content="${file.startsWith('blog/') ? 'article' : 'website'}" />`,
            `<meta property="og:site_name" content="Paraspur.com" />`,
            `<meta property="og:locale" content="en_IN" />`,
            `<meta property="og:title" content="${esc(title)}" />`,
            `<meta property="og:description" content="${esc(desc)}" />`,
            `<meta property="og:url" content="${canonicalUrl(file)}" />`,
            `<meta property="og:image" content="${DEFAULT_IMAGE}" />`,
          )
        }
        if (!has(/name="twitter:card"/i)) {
          tags.push(
            '<meta name="twitter:card" content="summary_large_image" />',
            `<meta name="twitter:title" content="${esc(title)}" />`,
            `<meta name="twitter:description" content="${esc(desc)}" />`,
            `<meta name="twitter:image" content="${DEFAULT_IMAGE}" />`,
          )
        }
        const crumbs = !noindex && !has(/BreadcrumbList/) ? breadcrumbs(root, file, title) : null
        if (crumbs) tags.push(`<script type="application/ld+json">${JSON.stringify(crumbs)}</script>`)
        if (file === 'index.html' && !has(/"WebSite"/)) {
          tags.push(`<script type="application/ld+json">${JSON.stringify({
            '@context': 'https://schema.org', '@type': 'WebSite', name: 'Paraspur.com', url: `${SITE}/`,
            inLanguage: ['en', 'hi'],
            potentialAction: { '@type': 'SearchAction', target: `${SITE}/directory/schools.html?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
          })}</script>`)
        }
        return tags.length ? html.replace('</head>', `  ${tags.join('\n  ')}\n</head>`) : html
      },
    },
    closeBundle() {
      // Sitemap generated from every indexable page so it can never drift from the site
      const today = new Date().toISOString().slice(0, 10)
      const lastmod = (f) => {
        try {
          const d = execSync(`git log -1 --format=%cs -- "${f}"`, { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
          return d || today
        } catch { return today }
      }
      const files = listHtmlFiles(root)
        .filter((f) => !isNoindex(readFileSync(resolve(root, f), 'utf-8')))
        .filter((f) => !f.startsWith('villages/') || f === 'villages/index.html')
        .sort((a, b) => (a === 'index.html' ? -1 : b === 'index.html' ? 1 : a.localeCompare(b)))
      const prio = (f) => (f === 'index.html' ? '1.0' : /^(directory|agriculture|paraspur-market)/.test(f) ? '0.9' : /privacy|terms|disclaimer/.test(f) ? '0.3' : '0.7')
      const freq = (f) => (/mandi|government-jobs|news/.test(f) ? 'daily' : f === 'index.html' ? 'weekly' : 'monthly')
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        files.map((f) => `  <url><loc>${canonicalUrl(f)}</loc><lastmod>${lastmod(f)}</lastmod><changefreq>${freq(f)}</changefreq><priority>${prio(f)}</priority></url>`).join('\n') + '\n</urlset>\n'
      writeFileSync(resolve(root, 'dist/sitemap.xml'), xml)
    },
  }
}
