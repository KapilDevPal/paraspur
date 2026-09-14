// Shared Devotional Reader Controller & Toolbar Component

export const DevotionalReaderBar = `
<div id="devotional-reader-bar" class="sticky top-20 z-40 bg-white/95 backdrop-blur-md p-3.5 md:p-4 rounded-2xl border border-slate-200 shadow-md mb-8 transition-all duration-300">
  <div class="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
    
    <!-- Reader Focus Toggle -->
    <div class="flex items-center space-x-2">
      <button id="reader-focus-btn" class="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl font-bold transition flex items-center gap-1.5 shadow-sm">
        <span class="text-sm">📖</span>
        <span id="focus-btn-label">Focus Reading Mode</span>
      </button>
    </div>

    <!-- Theme Selector -->
    <div class="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl">
      <span class="text-[10px] font-black uppercase text-slate-400 px-2 hidden sm:inline">Theme:</span>
      <button data-reader-theme="light" class="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-white text-slate-800 shadow-sm transition">Light</button>
      <button data-reader-theme="sepia" class="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-amber-950 hover:bg-amber-100/70 transition">Temple Gold</button>
      <button data-reader-theme="dark" class="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-300 hover:bg-slate-800 transition">Night</button>
    </div>

    <!-- Font Controls & Auto-Scroll -->
    <div class="flex items-center space-x-2">
      <!-- Font Resizer -->
      <div class="flex items-center bg-slate-100 p-1 rounded-xl space-x-1">
        <button id="reader-font-dec" class="px-2.5 py-1 hover:bg-white text-slate-700 font-bold rounded-lg transition" title="Smaller font">A-</button>
        <button id="reader-font-reset" class="px-2 py-1 hover:bg-white text-slate-500 font-semibold text-[10px] rounded-lg transition" title="Reset font">Reset</button>
        <button id="reader-font-inc" class="px-2.5 py-1 hover:bg-white text-slate-700 font-bold rounded-lg transition" title="Larger font">A+</button>
      </div>

      <!-- Hands-Free Auto Scroll -->
      <button id="reader-autoscroll-btn" class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition flex items-center gap-1.5" title="Hands-free chanting scroll">
        <span>📜</span>
        <span id="autoscroll-label" class="hidden sm:inline">Auto Scroll</span>
      </button>
    </div>

  </div>
</div>
`;

export function initDevotionalReader() {
  const barContainer = document.querySelector('#reader-bar-container');
  if (barContainer && !barContainer.hasChildNodes()) {
    barContainer.innerHTML = DevotionalReaderBar;
  }

  const focusBtn = document.querySelector('#reader-focus-btn');
  const focusBtnLabel = document.querySelector('#focus-btn-label');
  const sidebar = document.querySelector('#sidebar-col');
  const mainCol = document.querySelector('#main-reading-col');
  const heroHeader = document.querySelector('header');
  const themeBtns = document.querySelectorAll('[data-reader-theme]');
  const fontDec = document.querySelector('#reader-font-dec');
  const fontInc = document.querySelector('#reader-font-inc');
  const fontReset = document.querySelector('#reader-font-reset');
  const autoScrollBtn = document.querySelector('#reader-autoscroll-btn');
  const autoScrollLabel = document.querySelector('#autoscroll-label');
  const textElements = document.querySelectorAll('.aarti-text, .chalisa-text, .devotional-text');

  let isFocusMode = false;
  let autoScrollTimer = null;
  let isAutoScrolling = false;
  let currentFontSize = 1.125; // rem

  // 1. Focus Reading Mode Toggle
  if (focusBtn) {
    focusBtn.addEventListener('click', () => {
      isFocusMode = !isFocusMode;
      if (isFocusMode) {
        if (sidebar) sidebar.classList.add('hidden');
        if (mainCol) {
          mainCol.classList.remove('lg:col-span-8');
          mainCol.classList.add('lg:col-span-12', 'max-w-4xl', 'mx-auto');
        }
        if (heroHeader) heroHeader.classList.add('py-6', 'md:py-8');
        focusBtn.classList.remove('bg-amber-50', 'text-amber-900');
        focusBtn.classList.add('bg-amber-600', 'text-white');
        if (focusBtnLabel) focusBtnLabel.textContent = 'Exit Focus Mode';
      } else {
        if (sidebar) sidebar.classList.remove('hidden');
        if (mainCol) {
          mainCol.classList.remove('lg:col-span-12', 'max-w-4xl', 'mx-auto');
          mainCol.classList.add('lg:col-span-8');
        }
        if (heroHeader) heroHeader.classList.remove('py-6', 'md:py-8');
        focusBtn.classList.remove('bg-amber-600', 'text-white');
        focusBtn.classList.add('bg-amber-50', 'text-amber-900');
        if (focusBtnLabel) focusBtnLabel.textContent = 'Focus Reading Mode';
      }
    });
  }

  // 2. Theme Selector
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-reader-theme');
      
      // Reset button styles
      themeBtns.forEach(b => b.classList.remove('bg-white', 'shadow-sm', 'text-slate-800'));
      btn.classList.add('bg-white', 'shadow-sm', 'text-slate-800');

      textElements.forEach(el => {
        el.classList.remove(
          'bg-gradient-to-b', 'from-amber-50/70', 'to-orange-50/40',
          'bg-[#fff8e7]', 'text-[#4a2e00]', 'border-[#e8d5b5]',
          'bg-slate-900', 'text-amber-100', 'border-slate-800'
        );

        if (theme === 'sepia') {
          el.style.backgroundColor = '#fff9eb';
          el.style.color = '#4a1d00';
          el.style.borderColor = '#e6c896';
        } else if (theme === 'dark') {
          el.style.backgroundColor = '#0f172a';
          el.style.color = '#fef08a';
          el.style.borderColor = '#1e293b';
        } else { // Light
          el.style.backgroundColor = '';
          el.style.color = '';
          el.style.borderColor = '';
        }
      });
    });
  });

  // 3. Font Resizer
  if (fontInc) {
    fontInc.addEventListener('click', () => {
      if (currentFontSize < 1.75) {
        currentFontSize += 0.125;
        textElements.forEach(el => el.style.fontSize = currentFontSize + 'rem');
      }
    });
  }

  if (fontDec) {
    fontDec.addEventListener('click', () => {
      if (currentFontSize > 0.875) {
        currentFontSize -= 0.125;
        textElements.forEach(el => el.style.fontSize = currentFontSize + 'rem');
      }
    });
  }

  if (fontReset) {
    fontReset.addEventListener('click', () => {
      currentFontSize = 1.125;
      textElements.forEach(el => el.style.fontSize = '');
    });
  }

  // 4. Hands-Free Auto Scroll
  if (autoScrollBtn) {
    autoScrollBtn.addEventListener('click', () => {
      isAutoScrolling = !isAutoScrolling;
      if (isAutoScrolling) {
        autoScrollBtn.classList.remove('bg-slate-100', 'text-slate-700');
        autoScrollBtn.classList.add('bg-green-600', 'text-white');
        if (autoScrollLabel) autoScrollLabel.textContent = 'Pause Scroll';
        autoScrollTimer = setInterval(() => {
          window.scrollBy({ top: 1, behavior: 'smooth' });
        }, 35);
      } else {
        clearInterval(autoScrollTimer);
        autoScrollBtn.classList.remove('bg-green-600', 'text-white');
        autoScrollBtn.classList.add('bg-slate-100', 'text-slate-700');
        if (autoScrollLabel) autoScrollLabel.textContent = 'Auto Scroll';
      }
    });
  }
}
