export const Header = `
<header class="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
  <div class="container mx-auto px-4 h-20 flex items-center justify-between">
    <a href="/" class="flex items-center space-x-2">
      <span class="text-2xl font-display font-black text-primary-600">PARASPUR</span>
      <span class="text-xs font-bold text-slate-500 tracking-widest uppercase mt-1">Gonda, UP</span>
    </a>
    <nav class="hidden md:flex items-center space-x-8">
      <a href="/" class="text-sm font-semibold text-slate-600 hover:text-primary-600">Home</a>
      <div class="relative group">
        <button class="text-sm font-semibold text-slate-600 hover:text-primary-600 flex items-center">
          Directory
          <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="Bug19 9l-7 7-7-7"></path></svg>
        </button>
        <div class="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div class="py-2">
            <a href="/directory/schools.html" class="block px-4 py-2 text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-600">Schools</a>
            <a href="/directory/hospitals.html" class="block px-4 py-2 text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-600">Hospitals</a>
            <a href="/directory/colleges.html" class="block px-4 py-2 text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-600">Colleges</a>
            <a href="/directory/temples.html" class="block px-4 py-2 text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-600">Temples</a>
            <a href="/directory/banks.html" class="block px-4 py-2 text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-600">Banks</a>
            <a href="/directory/libraries.html" class="block px-4 py-2 text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-600">Libraries</a>
            <a href="/directory/businesses.html" class="block px-4 py-2 text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-600">Businesses & Shops</a>
            <a href="/directory/best-beauty-parlour-in-paraspur.html" class="block px-4 py-2 text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-600">Beauty Parlours</a>
            <a href="/directory/best-ladies-boutique-in-paraspur.html" class="block px-4 py-2 text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-600">Ladies Boutique</a>
            <a href="/directory/wedding-shopping-in-paraspur.html" class="block px-4 py-2 text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-600">Wedding Shopping</a>
            <a href="/info/politicians.html" class="block px-4 py-2 text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-600">Politicians & Leaders</a>
            <a href="/villages/index.html" class="block px-4 py-2 text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-600">Village Directory</a>
          </div>
        </div>
      </div>
      <a href="/info/news.html" class="text-sm font-semibold text-slate-600 hover:text-primary-600">Local News</a>
      <a href="/info/history.html" class="text-sm font-semibold text-slate-600 hover:text-primary-600">History</a>
    </nav>
    <div class="md:hidden">
      <button id="mobile-menu-btn" class="p-2 text-slate-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
      </button>
    </div>
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
          <li><a href="/info/history.html" class="hover:text-primary-400 transition">About Paraspur</a></li>
          <li><a href="/contact.html" class="hover:text-primary-400 transition">Contact Us</a></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-bold mb-6">Connect</h4>
        <p class="text-sm mb-4">Subscribe to our newsletter for latest local updates.</p>
        <div class="flex">
          <input type="email" placeholder="Email address" class="bg-slate-800 border-none rounded-l-lg px-4 py-2 w-full focus:ring-1 focus:ring-primary-500">
          <button class="bg-primary-600 px-4 py-2 rounded-r-lg hover:bg-primary-700">Go</button>
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
