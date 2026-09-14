import './style.css';
import { Header, Footer, AdBanner, MobileBottomNav } from './components/layout.js';

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

  // Inject Mobile Bottom Navigation Bar directly into document.body
  document.body.insertAdjacentHTML('beforeend', processLinks(MobileBottomNav));

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

  // Mobile menu drawer toggle & touch controls
  const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
  const bottomNavMenuBtn = document.querySelector('#bottom-nav-menu-btn');
  const mobileMenuCloseBtn = document.querySelector('#mobile-menu-close-btn');
  const mobileMenu = document.querySelector('#mobile-menu');

  const toggleMobileMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
      if (!mobileMenu.classList.contains('hidden')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const bindToggle = (btn) => {
    if (!btn) return;
    btn.addEventListener('click', toggleMobileMenu);
    btn.addEventListener('touchend', toggleMobileMenu);
  };

  bindToggle(mobileMenuBtn);
  bindToggle(bottomNavMenuBtn);

  if (mobileMenuCloseBtn) {
    const closeMenu = (e) => {
      if (e) e.preventDefault();
      if (mobileMenu) mobileMenu.classList.add('hidden');
    };
    mobileMenuCloseBtn.addEventListener('click', closeMenu);
    mobileMenuCloseBtn.addEventListener('touchend', closeMenu);
  }

  // Close mobile drawer when any link inside it is clicked/tapped
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // Active state highlighter for Mobile Bottom Navigation
  const bottomNavItems = document.querySelectorAll('[data-bottom-nav]');
  bottomNavItems.forEach(item => {
    const key = item.getAttribute('data-bottom-nav');
    let isActive = false;
    if (key === 'home' && (pathname.endsWith('/') || pathname.endsWith('/index.html') || pathname === repoName || pathname === repoName + '/')) {
      isActive = true;
    } else if (key === 'bhakti' && pathname.includes('/devotional/')) {
      isActive = true;
    } else if (key === 'directory' && (pathname.includes('/directory/') || pathname.includes('/villages/'))) {
      isActive = true;
    } else if (key === 'gonda' && pathname.includes('/gonda/')) {
      isActive = true;
    }

    if (isActive) {
      item.classList.remove('text-slate-500');
      item.classList.add('text-primary-600', 'font-black');
    }
  });

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

  // Live Govt Job & Exam Google News fetch logic
  const govtJobNewsContainer = document.querySelector('#live-govt-news-container');
  if (govtJobNewsContainer) {
    fetchGovtJobNews(govtJobNewsContainer);
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
    const rssUrl = encodeURIComponent('https://news.google.com/rss/search?q=Paraspur+Gonda+when:1d&hl=hi&gl=IN&ceid=IN:hi');
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
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

async function fetchGovtJobNews(container) {
  try {
    const rssUrl = encodeURIComponent('https://news.google.com/rss/search?q=Sarkari+Result+UP+Police+UPSSSC+UPPSC+when:3d&hl=hi&gl=IN&ceid=IN:hi');
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
    const data = await response.json();
    
    if (data.status === 'ok' && data.items && data.items.length > 0) {
      container.innerHTML = data.items.slice(0, 8).map(item => `
        <div class="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-red-400 hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="px-2.5 py-0.5 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-wider rounded-full">Google News Live</span>
              <span class="text-[10px] font-bold text-slate-400">${new Date(item.pubDate).toLocaleString('hi-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <h4 class="font-bold text-slate-900 group-hover:text-red-600 transition text-base leading-snug">
              <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>
            </h4>
            <p class="text-xs text-slate-500 mt-1.5 line-clamp-2">${item.description.replace(/<[^>]*>?/gm, '')}</p>
          </div>
          <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="shrink-0 px-4 py-2 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white font-bold text-xs rounded-xl transition">
            Read News →
          </a>
        </div>
      `).join('');
    } else {
      container.innerHTML = `
        <div class="p-4 bg-white rounded-xl text-slate-500 text-xs font-semibold">
          Live exam news sync completed. Stay tuned for instant UP Police & UPSSSC notifications.
        </div>`;
    }
  } catch (error) {
    console.error('Error fetching live govt job news:', error);
    container.innerHTML = `
      <div class="p-4 bg-white rounded-xl text-slate-500 text-xs font-semibold">
        Live news updates will sync automatically upon connection.
      </div>`;
  }
}

