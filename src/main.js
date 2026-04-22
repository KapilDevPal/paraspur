import './style.css';
import { Header, Footer, AdBanner } from './components/layout.js';

// Global AdSense Injector
const adsenseScript = document.createElement('script');
adsenseScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3476842786908483";
adsenseScript.async = true;
adsenseScript.crossOrigin = "anonymous";
document.head.appendChild(adsenseScript);

document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.querySelector('#header-container');
  const footerContainer = document.querySelector('#footer-container');

  // Fix for GitHub Pages subfolder 404s
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  const isGitHubPages = hostname.includes('github.io') || pathname.includes('/paraspur/');
  const repoName = '/paraspur';
  const basePath = isGitHubPages && pathname.includes(repoName) ? repoName : '';

  const processLinks = (html) => {
    if (!basePath) return html;
    // Replace absolute links with repo-relative links
    return html.replace(/href="\/(?!http|https|#)/g, `href="${basePath}/`);
  };

  if (headerContainer) headerContainer.innerHTML = processLinks(Header + AdBanner);
  if (footerContainer) footerContainer.innerHTML = processLinks(Footer);

  // Global Link Fixer for all other links in the document
  if (isGitHubPages) {
    document.querySelectorAll('a[href^="/"]').forEach(link => {
      const currentHref = link.getAttribute('href');
      if (currentHref.startsWith('/') && !currentHref.startsWith(repoName)) {
        link.setAttribute('href', repoName + currentHref);
      }
    });
    
    // Also fix images if they have absolute paths
    document.querySelectorAll('img[src^="/"]').forEach(img => {
      const currentSrc = img.getAttribute('src');
      if (currentSrc.startsWith('/') && !currentSrc.startsWith(repoName)) {
        img.setAttribute('src', repoName + currentSrc);
      }
    });
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
  const mobileMenu = document.querySelector('#mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // News fetch logic
  const newsContainer = document.querySelector('#rss-news-container, #news-feed');
  if (newsContainer) {
    fetchNews(newsContainer);
  }

  // Mobile search toggle
  const mobileSearchBtn = document.querySelector('#mobile-search-btn');
  const mobileSearchBar = document.querySelector('#mobile-search-bar');
  if (mobileSearchBtn && mobileSearchBar) {
    mobileSearchBtn.addEventListener('click', () => {
      mobileSearchBar.classList.toggle('hidden');
      const input = mobileSearchBar.querySelector('input');
      if (!mobileSearchBar.classList.contains('hidden')) {
        input.focus();
      }
    });
  }

  // Search Logic
  const categoryColors = {
    'Blog':      { bg: 'bg-accent-50',   text: 'text-accent-700'  },
    'Education': { bg: 'bg-blue-50',     text: 'text-blue-700'    },
    'Health':    { bg: 'bg-green-50',    text: 'text-green-700'   },
    'Jobs':      { bg: 'bg-orange-50',   text: 'text-orange-700'  },
    'News':      { bg: 'bg-red-50',      text: 'text-red-700'     },
    'Village':   { bg: 'bg-teal-50',     text: 'text-teal-700'    },
    'Info':      { bg: 'bg-slate-100',   text: 'text-slate-600'   },
    'Guide':     { bg: 'bg-purple-50',   text: 'text-purple-700'  },
    'General':   { bg: 'bg-primary-50',  text: 'text-primary-700' },
    'Directory': { bg: 'bg-primary-50',  text: 'text-primary-700' },
  };

  const highlight = (text, query) => {
    if (!query) return text;
    const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<mark class="bg-accent-100 text-accent-900 rounded px-0.5">$1</mark>');
  };

  const initSearch = async () => {
    const searchPairs = [
      {
        input: document.querySelector('#global-search-input'),
        results: document.querySelector('#search-results'),
        list: document.querySelector('#search-results-list'),
        root: document.querySelector('#search-root')
      },
      {
        input: document.querySelector('#mobile-search-input'),
        results: document.querySelector('#mobile-search-results'),
        list: document.querySelector('#mobile-search-results-list'),
        root: document.querySelector('#mobile-search-root')
      }
    ];
    
    const activePairs = searchPairs.filter(p => p.input && p.results && p.list);
    if (activePairs.length === 0) return;

    let index = [];
    try {
      const response = await fetch(`${basePath}/search-index.json`);
      index = await response.json();
    } catch (err) {
      console.error('Failed to load search index', err);
    }

    activePairs.forEach(pair => {
      let activeIndex = -1;

      const getItems = () => pair.list.querySelectorAll('a[data-result]');

      const setActive = (i) => {
        const items = getItems();
        items.forEach((el, idx) => {
          if (idx === i) {
            el.classList.add('bg-primary-50');
            el.classList.remove('hover:bg-slate-50');
          } else {
            el.classList.remove('bg-primary-50');
            el.classList.add('hover:bg-slate-50');
          }
        });
        activeIndex = i;
      };

      const showResults = (matches, query) => {
        if (matches.length === 0) {
          pair.list.innerHTML = `
            <div class="px-4 py-6 text-center">
              <p class="text-sm font-semibold text-slate-500">No results for "<span class="text-slate-800">${query}</span>"</p>
              <p class="text-xs text-slate-400 mt-1">Try searching for villages, schools, hospitals, or blogs</p>
            </div>`;
          pair.results.classList.remove('hidden');
          return;
        }

        const col = (cat) => categoryColors[cat] || categoryColors['Directory'];
        pair.list.innerHTML = matches.map((item, i) => `
          <a data-result="${i}" href="${item.url}" class="flex items-start px-4 py-3 hover:bg-slate-50 transition border-b border-slate-50 last:border-none group">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-0.5">
                <span class="text-xs font-bold text-slate-900 truncate">${highlight(item.title, query)}</span>
                <span class="flex-shrink-0 text-[9px] font-black uppercase tracking-widest ${col(item.category).text} ${col(item.category).bg} px-2 py-0.5 rounded-full">${item.category}</span>
              </div>
              ${item.description ? `<span class="text-[10px] text-slate-400 line-clamp-1">${item.description}</span>` : ''}
            </div>
            <svg class="w-3 h-3 text-slate-300 group-hover:text-primary-500 flex-shrink-0 ml-2 mt-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>
          </a>
        `).join('') + `
          <div class="px-4 py-2 border-t border-slate-100 bg-slate-50">
            <a href="/blog/index.html" class="text-[10px] font-black text-primary-600 hover:text-primary-800 uppercase tracking-widest transition">
              Browse all articles →
            </a>
          </div>`;
        
        pair.results.classList.remove('hidden');
        activeIndex = -1;
      };

      pair.input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        activeIndex = -1;
        if (query.length < 2) {
          pair.results.classList.add('hidden');
          return;
        }

        const matches = index.filter(item =>
          item.title.toLowerCase().includes(query) ||
          item.keywords.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query))
        ).slice(0, 8);

        showResults(matches, query);
      });

      // Keyboard navigation
      pair.input.addEventListener('keydown', (e) => {
        const items = getItems();
        if (!items.length) return;
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActive(Math.min(activeIndex + 1, items.length - 1));
          items[activeIndex]?.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActive(Math.max(activeIndex - 1, 0));
          items[activeIndex]?.scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter' && activeIndex >= 0) {
          e.preventDefault();
          items[activeIndex]?.click();
        }
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (pair.root && !pair.root.contains(e.target) && e.target !== pair.input) {
          pair.results.classList.add('hidden');
        }
      });

      // Focus: show last results again if input has value
      pair.input.addEventListener('focus', () => {
        if (pair.input.value.trim().length >= 2) {
          pair.results.classList.remove('hidden');
        }
      });
    });

    // ESC to close all
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        activePairs.forEach(pair => {
          pair.results.classList.add('hidden');
          pair.input.blur();
        });
        if (mobileSearchBar) mobileSearchBar.classList.add('hidden');
      }
    });
  };

  initSearch();
});

async function fetchNews(container) {
  try {
    // Note: In a real production environment, you might need a proxy for external RSS
    // For this demonstration, we'll simulate the TOI feed or use a placeholder
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://timesofindia.indiatimes.com/rssfeeds/-2128819658.cms');
    const data = await response.json();
    
    if (data.status === 'ok') {
      container.innerHTML = data.items.slice(0, 5).map(item => `
        <div class="flex items-start space-x-6 pb-6 border-b border-slate-100 last:border-0 group">
          <div class="flex-1">
            <span class="text-[10px] font-black uppercase text-primary-600 tracking-widest mb-2 block">${new Date(item.pubDate).toLocaleDateString()}</span>
            <h3 class="font-bold text-lg text-slate-800 hover:text-primary-600 transition leading-snug">
              <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
            </h3>
            <p class="text-sm text-slate-500 mt-2 line-clamp-2">${item.description.replace(/<[^>]*>?/gm, '')}</p>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    container.innerHTML = '<p class="text-slate-400 text-sm">Latest news updates will appear here soon.</p>';
  }
}

