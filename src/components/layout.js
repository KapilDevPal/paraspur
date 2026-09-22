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
        <div class="absolute top-full left-0 mt-2 w-64 bg-white shadow-2xl rounded-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left scale-95 group-hover:scale-100">
          <div class="py-3 px-1 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <a href="/directory/schools.html" class="block px-4 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">🏫 Schools in Paraspur</a>
            <a href="/directory/hospitals.html" class="block px-4 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">🏥 Hospitals & CHC</a>
            <a href="/directory/colleges.html" class="block px-4 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">🎓 Colleges & Institutes</a>
            <a href="/directory/banks.html" class="block px-4 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">🏦 Banks & ATMs</a>
            <a href="/directory/libraries.html" class="block px-4 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">📚 Libraries & Study Centers</a>
            <a href="/directory/temples.html" class="block px-4 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">🛕 Temples & Heritage</a>
            <a href="/paraspur-market.html" class="block px-4 py-2.5 text-[13px] font-bold text-slate-900 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">🛍️ Paraspur Market Guide</a>
            <a href="/directory/businesses.html" class="block px-4 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">🏪 Shops & Services</a>
            <a href="/directory/jobs.html" class="block px-4 py-2.5 text-[13px] font-semibold text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">💼 Local Jobs & Careers</a>
            <a href="/directory/government-jobs.html" class="block px-4 py-2.5 text-[13px] font-bold text-primary-600 hover:bg-primary-50 rounded-xl transition">🏛️ Govt Jobs & Exams</a>
            <a href="/villages/index.html" class="block px-4 py-2.5 text-[13px] font-bold text-slate-900 border-t border-slate-50 mt-2 hover:bg-primary-50 hover:text-primary-600 rounded-xl transition">🏡 Village & Gram Panchayat Directory</a>
          </div>
        </div>
      </div>
      <a href="/paraspur-market.html" class="text-xs font-bold text-slate-600 hover:text-primary-600 uppercase tracking-wider transition">Market</a>
      <a href="/agriculture/index.html" class="text-xs font-bold text-green-700 hover:text-green-800 uppercase tracking-wider transition">Agriculture & Mandi</a>
      <a href="/directory/temples.html" class="text-xs font-bold text-amber-700 hover:text-amber-800 uppercase tracking-wider transition">Heritage & Sukarkhet</a>
      <a href="/gonda/index.html" class="text-xs font-bold text-slate-600 hover:text-primary-600 uppercase tracking-wider transition">Gonda Guide</a>
      <a href="/blog/index.html" class="text-xs font-bold text-slate-600 hover:text-primary-600 uppercase tracking-wider transition">Blogs</a>
      <a href="/info/news.html" class="text-xs font-bold text-slate-600 hover:text-primary-600 uppercase tracking-wider transition">News</a>
    </nav>

    <!-- Search Bar -->
    <div class="flex-1 max-w-sm mx-8 relative hidden md:block" id="search-root">
      <div class="relative group">
        <input 
          type="text" 
          id="global-search-input"
          placeholder="Search schools, hospitals, market, villages..." 
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
        placeholder="Search schools, hospitals, villages..." 
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
  
  <!-- Mobile Menu Drawer -->
  <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-slate-100 fixed inset-x-0 top-20 bottom-16 z-[9998] overflow-y-auto shadow-2xl animate-in slide-in-from-top duration-300">
    <div class="p-5 space-y-6">
      
      <!-- Drawer Header Bar -->
      <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <span class="text-xs font-black text-slate-400 uppercase tracking-widest">Navigation Menu</span>
        <button id="mobile-menu-close-btn" class="p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Quick Action Shortcuts -->
      <div class="bg-gradient-to-br from-primary-50 to-primary-100/50 p-4 rounded-2xl border border-primary-200/60 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-xs font-black text-primary-800 uppercase tracking-wider flex items-center gap-1.5">
            <span>⭐</span> Essential Local Hubs
          </span>
          <span class="text-[9px] font-black bg-primary-600 text-white px-2 py-0.5 rounded-full uppercase">VERIFIED</span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-xs font-bold text-slate-800">
          <a href="/paraspur-market.html" class="p-2.5 bg-white rounded-xl shadow-sm border border-primary-100 hover:text-primary-600 transition flex items-center justify-between"><span>🛍️ Market Guide</span> <span>→</span></a>
          <a href="/agriculture/mandi-bhav.html" class="p-2.5 bg-white rounded-xl shadow-sm border border-primary-100 hover:text-green-600 transition flex items-center justify-between"><span>🌾 Mandi Rates</span> <span>→</span></a>
          <a href="/directory/hospitals.html" class="p-2.5 bg-white rounded-xl shadow-sm border border-primary-100 hover:text-red-600 transition flex items-center justify-between"><span>🏥 CHC & Doctors</span> <span>→</span></a>
          <a href="/directory/temples.html" class="p-2.5 bg-white rounded-xl shadow-sm border border-primary-100 hover:text-amber-600 transition flex items-center justify-between"><span>🛕 Sukarkhet Paska</span> <span>→</span></a>
        </div>
      </div>

      <!-- Directories Section -->
      <div class="space-y-3">
        <span class="text-xs font-black text-slate-400 uppercase tracking-widest block">Paraspur Directory</span>
        <div class="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
          <a href="/directory/schools.html" class="p-3 bg-slate-50 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition flex items-center gap-2"><span>🏫</span> Schools</a>
          <a href="/directory/hospitals.html" class="p-3 bg-slate-50 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition flex items-center gap-2"><span>🏥</span> Hospitals</a>
          <a href="/directory/colleges.html" class="p-3 bg-slate-50 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition flex items-center gap-2"><span>🎓</span> Colleges</a>
          <a href="/directory/banks.html" class="p-3 bg-slate-50 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition flex items-center gap-2"><span>🏦</span> Banks & ATMs</a>
          <a href="/directory/libraries.html" class="p-3 bg-slate-50 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition flex items-center gap-2"><span>📚</span> Libraries</a>
          <a href="/directory/businesses.html" class="p-3 bg-slate-50 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition flex items-center gap-2"><span>🛍️</span> Shops & Bazar</a>
          <a href="/directory/agriculture.html" class="p-3 bg-slate-50 rounded-xl hover:bg-green-50 hover:text-green-600 transition flex items-center gap-2"><span>🌾</span> Agriculture</a>
          <a href="/villages/index.html" class="p-3 bg-slate-50 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition flex items-center gap-2"><span>🏡</span> Villages Guide</a>
        </div>
      </div>

      <!-- Regional & Guides -->
      <div class="space-y-3">
        <span class="text-xs font-black text-slate-400 uppercase tracking-widest block">Regional Guides</span>
        <div class="grid grid-cols-2 gap-2 text-xs font-bold">
          <a href="/gonda/index.html" class="p-3 bg-primary-50 text-primary-700 rounded-xl hover:bg-primary-100 transition flex items-center justify-between"><span>Gonda Guide</span> <span>→</span></a>
          <a href="/blog/tulsidas-ayodhya-paraspur-connection.html" class="p-3 bg-amber-50 text-amber-700 rounded-xl hover:bg-amber-100 transition flex items-center justify-between"><span>Tulsidas History</span> <span>→</span></a>
          <a href="/directory/government-jobs.html" class="p-3 bg-slate-100 text-slate-900 rounded-xl hover:bg-slate-200 transition flex items-center justify-between col-span-2"><span>Govt Jobs & Alerts</span> <span>→</span></a>
        </div>
      </div>

      <!-- Info & News -->
      <div class="border-t border-slate-100 pt-4 flex items-center justify-between text-xs font-bold text-slate-600">
        <a href="/info/news.html" class="hover:text-primary-600">Local News</a>
        <a href="/info/history.html" class="hover:text-primary-600">History</a>
        <a href="/info/pin-code.html" class="hover:text-primary-600">Pin Code</a>
        <a href="/contact.html" class="text-primary-600 hover:underline">Contact</a>
      </div>

    </div>
  </div>
</header>
`;

export const MobileBottomNav = `
<nav id="mobile-bottom-nav" class="fixed bottom-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl md:hidden px-2 py-1 flex items-center justify-around pointer-events-auto touch-manipulation">
  <a href="/" data-bottom-nav="home" class="flex flex-col items-center justify-center w-full py-1 text-slate-500 hover:text-primary-600 transition group">
    <svg class="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
    <span class="text-[10px] font-bold tracking-tight">Home</span>
  </a>

  <a href="/directory/schools.html" data-bottom-nav="directory" class="flex flex-col items-center justify-center w-full py-1 text-slate-500 hover:text-primary-600 transition group">
    <svg class="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
    <span class="text-[10px] font-bold tracking-tight">Directory</span>
  </a>

  <a href="/paraspur-market.html" data-bottom-nav="market" class="flex flex-col items-center justify-center w-full py-1 text-primary-600 hover:text-primary-700 transition group">
    <svg class="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
    <span class="text-[10px] font-black uppercase tracking-tight">Market</span>
  </a>

  <a href="/agriculture/mandi-bhav.html" data-bottom-nav="mandi" class="flex flex-col items-center justify-center w-full py-1 text-green-600 hover:text-green-700 transition group">
    <svg class="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
    <span class="text-[10px] font-bold tracking-tight">Mandi</span>
  </a>

  <button id="bottom-nav-menu-btn" data-bottom-nav="menu" class="flex flex-col items-center justify-center w-full py-1 text-slate-500 hover:text-primary-600 transition group">
    <svg class="w-5 h-5 mb-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16m-7 6h7"/></svg>
    <span class="text-[10px] font-bold tracking-tight">Menu</span>
  </button>
</nav>
`;

// Empty placeholder banner removed to prevent Google AdSense "Placeholder ads / ad intent without content" policy flag
export const AdBanner = ``;

export const Footer = `
<footer class="bg-slate-900 text-slate-300 py-16">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
      <div class="col-span-1 md:col-span-1">
        <a href="/" class="flex flex-col">
          <span class="text-2xl font-display font-black text-white">PARASPUR</span>
          <span class="text-xs font-bold text-slate-500 tracking-widest uppercase">Gonda, Uttar Pradesh</span>
        </a>
        <p class="mt-4 text-sm leading-relaxed text-slate-400">
          The verified community directory and regional information portal for Paraspur block and Gonda district. Connecting citizens with local schools, healthcare, markets, agriculture, and cultural heritage.
        </p>
        <div class="mt-6 text-xs text-slate-400 space-y-1">
          <p>📍 <strong>Block HQ:</strong> Paraspur, Gonda (UP) - 271504</p>
          <p>✉️ <strong>Editorial:</strong> veerexa0@gmail.com</p>
        </div>
      </div>
      <div>
        <h4 class="text-white font-bold mb-6">Directory & Services</h4>
        <ul class="space-y-3 text-sm">
          <li><a href="/directory/schools.html" class="hover:text-primary-400 transition">Schools & Academies</a></li>
          <li><a href="/directory/hospitals.html" class="hover:text-primary-400 transition">Hospitals & Emergency CHC</a></li>
          <li><a href="/directory/colleges.html" class="hover:text-primary-400 transition">Colleges & Degree Institutes</a></li>
          <li><a href="/directory/banks.html" class="hover:text-primary-400 transition">Banks & IFSC Directory</a></li>
          <li><a href="/directory/libraries.html" class="hover:text-primary-400 transition">Libraries & Study Centers</a></li>
          <li><a href="/paraspur-market.html" class="hover:text-primary-400 transition font-bold text-white">Paraspur Market & Bazaar</a></li>
          <li><a href="/directory/businesses.html" class="hover:text-primary-400 transition">Local Shops & Traders</a></li>
          <li><a href="/villages/index.html" class="hover:text-primary-400 transition">Village & Gram Panchayat Guide</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-bold mb-6">Regional Knowledge</h4>
        <ul class="space-y-3 text-sm">
          <li><a href="/agriculture/mandi-bhav.html" class="hover:text-green-400 transition font-bold text-green-400">Daily Mandi Rates (Gonda)</a></li>
          <li><a href="/agriculture/index.html" class="hover:text-green-400 transition">Farmer & Agriculture Guide</a></li>
          <li><a href="/directory/temples.html" class="hover:text-amber-400 transition">Sukarkhet Paska & Temples</a></li>
          <li><a href="/blog/tulsidas-ayodhya-paraspur-connection.html" class="hover:text-amber-400 transition">Tulsidas & Paraspur Heritage</a></li>
          <li><a href="/info/pin-code.html" class="hover:text-primary-400 transition">Postal PIN Code (271504)</a></li>
          <li><a href="/info/population.html" class="hover:text-primary-400 transition">Demographics & Census Data</a></li>
          <li><a href="/gonda/index.html" class="hover:text-primary-400 transition">Gonda District Guide</a></li>
          <li><a href="/directory/government-jobs.html" class="hover:text-primary-400 transition">Sarkari Result & UP Jobs</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-bold mb-6">Civic & Emergency</h4>
        <div class="space-y-3 text-xs text-slate-300 mb-6">
          <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <strong class="text-white block mb-0.5">🚨 Emergency Helplines</strong>
            <p class="text-slate-400">Ambulance: <a href="tel:108" class="text-red-400 font-bold hover:underline">108</a> / <a href="tel:102" class="text-red-400 font-bold hover:underline">102</a></p>
            <p class="text-slate-400">Police Assistance: <a href="tel:112" class="text-amber-400 font-bold hover:underline">112</a></p>
            <p class="text-slate-400">Women Helpline: <a href="tel:1090" class="text-primary-400 font-bold hover:underline">1090</a></p>
          </div>
          <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <strong class="text-white block mb-0.5">🏛️ Administrative Unit</strong>
            <p class="text-slate-400">Block: Paraspur | Tehsil: Colonelganj</p>
            <p class="text-slate-400">District: Gonda | State: Uttar Pradesh</p>
          </div>
        </div>
        <a href="/contact.html" class="inline-block w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-500 text-white font-bold text-center text-xs uppercase tracking-wider rounded-xl transition">
          Submit Directory Listing →
        </a>
      </div>
    </div>
    <div class="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
      <p>&copy; 2026 Paraspur.com. All rights reserved. Independent regional directory for Paraspur Block, Gonda (UP).</p>
      <div class="flex flex-wrap gap-4 mt-4 md:mt-0 justify-center">
        <a href="/about-website.html" class="hover:text-primary-400 transition">About Us</a>
        <a href="/contact.html" class="hover:text-primary-400 transition">Contact</a>
        <a href="/privacy-policy.html" class="hover:text-primary-400 transition">Privacy Policy</a>
        <a href="/terms.html" class="hover:text-primary-400 transition">Terms of Service</a>
        <a href="/disclaimer.html" class="hover:text-primary-400 transition">Disclaimer</a>
        <a href="/sitemap.xml" class="hover:text-primary-400 transition">Sitemap</a>
      </div>
    </div>
  </div>
</footer>
`;
