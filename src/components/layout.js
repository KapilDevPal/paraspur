export const Header = `
<header class="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
  <div class="container mx-auto px-4 h-20 flex items-center justify-between">
    <a href="/" class="flex items-center space-x-2">
      <span class="text-2xl font-display font-black text-primary-600">PARASPUR</span>
      <span class="text-xs font-bold text-slate-500 tracking-widest uppercase mt-1">Gonda, UP</span>
    </a>
    <nav class="hidden lg:flex items-center space-x-6">
      <a href="/" class="text-xs font-bold text-slate-600 hover:text-primary-600 uppercase tracking-wider transition">Home</a>
      <div class="relative group">
        <button class="text-xs font-bold text-slate-600 hover:text-primary-600 flex items-center uppercase tracking-wider transition">
          Directory
          <svg class="ml-1 w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute top-full left-0 mt-2 w-56 bg-white shadow-2xl rounded-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left scale-95 group-hover:scale-100">
          <div class="py-3 px-1 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <a href="/directory/schools.html" class="block px-4 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">Schools</a>
            <a href="/directory/hospitals.html" class="block px-4 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">Hospitals</a>
            <a href="/directory/colleges.html" class="block px-4 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">Colleges</a>
            <a href="/directory/temples.html" class="block px-4 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">Temples</a>
            <a href="/directory/banks.html" class="block px-4 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">Banks</a>
            <a href="/directory/businesses.html" class="block px-4 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">Businesses & Shops</a>
            <a href="/gonda/index.html" class="block px-4 py-2.5 text-[13px] font-bold text-primary-600 hover:bg-primary-50 rounded-xl transition">Gonda District Guide</a>
            <a href="/paraspur-market.html" class="block px-4 py-2.5 text-[13px] font-bold text-slate-900 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">Market Guide</a>
            <a href="/villages/index.html" class="block px-4 py-2.5 text-[13px] font-bold text-slate-900 border-t border-slate-50 mt-2 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">Village Directory</a>
          </div>
        </div>
      </div>
      <a href="/blog/index.html" class="text-xs font-bold text-slate-600 hover:text-primary-600 uppercase tracking-wider transition">Blogs</a>
      <a href="/gonda/index.html" class="text-xs font-black text-primary-600 hover:text-primary-700 uppercase tracking-widest transition border-b-2 border-primary-600 pb-1">Gonda Guide</a>
      <a href="/info/news.html" class="text-xs font-bold text-slate-600 hover:text-primary-600 uppercase tracking-wider transition">News</a>
    </nav>

    <!-- Search Bar -->
    <div class="flex-1 max-w-sm mx-8 relative hidden md:block" id="search-root">
      <div class="relative group">
        <input 
          type="text" 
          id="global-search-input"
          placeholder="Search villages, schools, news..." 
          class="w-full h-11 pl-11 pr-4 bg-slate-50 border-none rounded-2xl text-xs font-medium focus:ring-2 focus:ring-primary-500/20 focus:bg-white transition-all"
        >
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </span>
      </div>
      <!-- Search Results Dropdown -->
      <div id="search-results" class="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden hidden animate-in fade-in slide-in-from-top-2 duration-300 z-[100]">
        <div class="py-2" id="search-results-list"></div>
      </div>
    </div>

    <div class="flex items-center space-x-2">
      <button id="mobile-search-btn" class="p-2.5 text-slate-600 bg-slate-50 rounded-xl md:hidden hover:bg-primary-50 hover:text-primary-600 transition">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </button>
      <button id="mobile-menu-btn" class="p-2.5 text-slate-600 bg-slate-50 rounded-xl lg:hidden hover:bg-primary-50 hover:text-primary-600 transition">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
      </button>
      <a href="/contact.html" class="hidden sm:inline-flex px-6 py-3 bg-primary-600 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all hover:-translate-y-0.5">Contact Us</a>
    </div>
  </div>

  <!-- Mobile Search Bar -->
  <div id="mobile-search-bar" class="hidden md:hidden bg-white border-t border-slate-100 p-4 animate-in slide-in-from-top duration-300">
    <div class="relative" id="mobile-search-root">
      <input 
        type="text" 
        id="mobile-search-input"
        placeholder="Search villages, schools..." 
        class="w-full h-11 pl-11 pr-4 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 rotate-0 transition-all font-medium"
      >
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </span>
      <!-- Mobile Search Results -->
      <div id="mobile-search-results" class="absolute top-full left-0 right-0 mt-3 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden hidden z-[100]">
        <div class="py-2" id="mobile-search-results-list"></div>
      </div>
    </div>
  </div>
  
  <!-- Mobile Menu -->
  <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-slate-100 absolute w-full left-0 top-full shadow-2xl z-50 transition-all duration-300 origin-top">
    <nav class="flex flex-col px-6 py-6 space-y-6 max-h-[80vh] overflow-y-auto">
      <a href="/" class="text-lg font-semibold text-slate-800 hover:text-primary-600">Home</a>
      
      <div class="border-t border-slate-100 pt-6">
        <span class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 block">Directory</span>
        <div class="grid grid-cols-2 gap-y-4 gap-x-4">
          <a href="/directory/schools.html" class="text-sm font-medium text-slate-600 hover:text-primary-600">Schools</a>
          <a href="/directory/hospitals.html" class="text-sm font-medium text-slate-600 hover:text-primary-600">Hospitals</a>
          <a href="/directory/colleges.html" class="text-sm font-medium text-slate-600 hover:text-primary-600">Colleges</a>
          <a href="/directory/temples.html" class="text-sm font-medium text-slate-600 hover:text-primary-600">Temples</a>
          <a href="/directory/banks.html" class="text-sm font-medium text-slate-600 hover:text-primary-600">Banks</a>
          <a href="/directory/businesses.html" class="text-sm font-medium text-slate-600 hover:text-primary-600">Businesses</a>
          <a href="/directory/agriculture.html" class="text-sm font-medium text-slate-600 hover:text-primary-600">Agriculture</a>
          <a href="/villages/index.html" class="text-sm font-medium text-slate-600 hover:text-primary-600">Villages</a>
        </div>
      </div>
      
      <div class="border-t border-slate-100 pt-6 flex flex-col space-y-4">
        <a href="/info/news.html" class="text-lg font-semibold text-slate-800 hover:text-primary-600">Local News</a>
        <a href="/paraspur-market.html" class="text-lg font-semibold text-slate-800 hover:text-primary-600">Market</a>
        <a href="/info/history.html" class="text-lg font-semibold text-slate-800 hover:text-primary-600">History</a>
      </div>
    </nav>
  </div>
</header>
`;

export const AdBanner = `
<div class="bg-primary-600 text-white py-3">
  <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
    <p class="text-sm font-bold tracking-wide">
      <span class="bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase mr-2">Ad Placement</span>
      Want to promote your business or school here? Place your ad now!
    </p>
    <a href="mailto:admin@veerexa.com" class="mt-2 md:mt-0 text-sm font-black underline hover:text-primary-100 transition">
      Contact: admin@veerexa.com
    </a>
  </div>
</div>
`;

export const Footer = `
<footer class="bg-slate-900 text-slate-300 py-16">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
      <div class="col-span-1 md:col-span-1">
        <a href="/" class="flex flex-col">
          <span class="text-2xl font-display font-black text-white">PARASPUR</span>
          <span class="text-xs font-bold text-slate-500 tracking-widest uppercase">Gonda, Uttar Pradesh</span>
        </a>
        <p class="mt-6 text-sm leading-relaxed">
          Your complete guide to Paraspur, Gonda. Find schools, hospitals, local news, and villages in our beautiful block.
        </p>
      </div>
      <div>
        <h4 class="text-white font-bold mb-6">Directory</h4>
        <ul class="space-y-4 text-sm">
          <li><a href="/directory/schools.html" class="hover:text-primary-400 transition">Schools in Paraspur</a></li>
          <li><a href="/directory/hospitals.html" class="hover:text-primary-400 transition">Hospitals in Paraspur</a></li>
          <li><a href="/directory/colleges.html" class="hover:text-primary-400 transition">Colleges in Paraspur</a></li>
          <li><a href="/directory/temples.html" class="hover:text-primary-400 transition">Temples & Tourism</a></li>
          <li><a href="/directory/best-beauty-parlour-in-paraspur.html" class="hover:text-primary-400 transition">Beauty Parlours</a></li>
          <li><a href="/directory/best-ladies-boutique-in-paraspur.html" class="hover:text-primary-400 transition">Ladies Boutique</a></li>
          <li><a href="/paraspur-market.html" class="hover:text-primary-400 transition font-bold text-white">Paraspur Market</a></li>
          <li><a href="/villages/index.html" class="hover:text-primary-400 transition">All 91 Villages</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-bold mb-6">Quick Links</h4>
        <ul class="space-y-4 text-sm">
          <li><a href="/info/pin-code.html" class="hover:text-primary-400 transition">Pin Code (271504)</a></li>
          <li><a href="/villages/index.html" class="hover:text-primary-500 transition">All 91 Villages</a></li>
          <li><a href="/blog/tulsidas-ayodhya-paraspur-connection.html" class="hover:text-primary-500 transition">Tulsidas & Paraspur</a></li>
          <li><a href="/directory/businesses.html" class="hover:text-primary-500 transition">Market Guide</a></li>
          <li><a href="/info/population.html" class="hover:text-primary-400 transition">Population Data</a></li>
          <li><a href="/info/politicians.html" class="hover:text-primary-400 transition font-bold text-white">Politicians & Leaders</a></li>
          <li><a href="/directory/restaurants-paraspur.html" class="hover:text-primary-400 transition">Food & Restaurants</a></li>
          <li><a href="/directory/local-startups.html" class="hover:text-primary-400 transition">Local Startups</a></li>
          <li><a href="/info/history.html" class="hover:text-primary-400 transition">About Paraspur</a></li>
          <li><a href="/gonda/index.html" class="hover:text-primary-400 transition font-bold text-primary-400">Gonda District Guide</a></li>
          <li><a href="/gonda/history.html" class="hover:text-primary-400 transition">History of Gonda</a></li>
          <li><a href="/contact.html" class="hover:text-primary-400 transition">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-bold mb-6">Latest blogs</h4>
        <ul class="space-y-4 text-sm">
          <li><a href="/blog/index.html" class="hover:text-primary-400 transition">All Local Blogs</a></li>
          <li><a href="/blog/all-villages-in-paraspur-block.html" class="hover:text-primary-400 transition">Detailed Village Guide</a></li>
          <li><a href="/blog/tulsidas-ayodhya-paraspur-connection.html" class="hover:text-primary-400 transition">Tulsidas & Sukarkhet</a></li>
          <li><a href="/blog/beauty-parlours-in-paraspur-gonda.html" class="hover:text-primary-400 transition">Beauty Salon Guide</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-bold mb-6">Connect</h4>
        <p class="text-sm mb-4">Subscribe to our newsletter for latest local updates.</p>
        <div class="flex">
          <input type="email" placeholder="Email address" class="bg-slate-800 border-none rounded-l-lg px-4 py-2 w-full focus:ring-1 focus:ring-primary-500">
          <button class="bg-primary-600 px-4 py-2 rounded-r-lg hover:bg-primary-700 transition">Go</button>
        </div>
      </div>
    </div>
    <div class="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs">
      <p>&copy; 2026 Paraspur.com. All rights reserved. Designed for Gonda, Uttar Pradesh.</p>
      <div class="flex space-x-6 mt-4 md:mt-0">
        <a href="/privacy-policy.html" class="hover:text-primary-400">Privacy Policy</a>
        <a href="/about-website.html" class="hover:text-primary-400">About Website</a>
        <a href="/sitemap.xml" class="hover:text-primary-400">Sitemap</a>
      </div>
    </div>
  </div>
</footer>
`;
