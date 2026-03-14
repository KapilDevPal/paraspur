import './style.css';
import { Header, Footer, AdBanner } from './components/layout.js';

document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.querySelector('#header-container');
  const footerContainer = document.querySelector('#footer-container');

  if (headerContainer) headerContainer.innerHTML = Header + AdBanner;
  if (footerContainer) footerContainer.innerHTML = Footer;

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      // Toggle logic would go here if needed, 
      // but for now let's keep it simple or use a CSS-based dropdown
      alert('Mobile menu feature coming soon!');
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

