import './style.css';
import { Header, Footer, AdBanner } from './components/layout.js';

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
    
    // Filter out missing elements
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
      const showResults = (matches) => {
        if (matches.length === 0) {
          pair.results.classList.add('hidden');
          return;
        }

        pair.list.innerHTML = matches.map(item => `
          <a href="${item.url}" class="flex flex-col px-4 py-3 hover:bg-slate-50 transition border-b border-slate-50 last:border-none">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-bold text-slate-900">${item.title}</span>
              <span class="text-[9px] font-black uppercase tracking-widest text-primary-500 bg-primary-50 px-2 py-0.5 rounded-full">${item.category}</span>
            </div>
            <span class="text-[10px] text-slate-400 truncate">${item.url}</span>
          </a>
        `).join('');
        
        pair.results.classList.remove('hidden');
      };

      pair.input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
          pair.results.classList.add('hidden');
          return;
        }

        const matches = index.filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.keywords.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        ).slice(0, 6);

        showResults(matches);
      });

      // Close results when clicking outside
      document.addEventListener('click', (e) => {
        if (pair.root && !pair.root.contains(e.target) && e.target !== pair.input) {
          pair.results.classList.add('hidden');
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

