// navbar.js - Complete Fixed Version
(function() {
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    
    // ===== HERO SLIDER SECTION =====
    const images = document.querySelectorAll('.slider-image');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let sliderInterval = null; // Renamed to avoid conflicts

    // Only run slider if elements exist
    if (images.length > 0 && dots.length > 0) {
      function showImage(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        images[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
      }

      function nextImage() {
        showImage(currentIndex + 1);
      }

      function startRotation() {
        if (sliderInterval) clearInterval(sliderInterval);
        sliderInterval = setInterval(nextImage, 5000);
      }

      showImage(0);
      startRotation();

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (sliderInterval) clearInterval(sliderInterval);
        } else {
          startRotation();
        }
      });
    }

    // ===== MOBILE MENU SECTION =====
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    const closeMenuBtn = document.getElementById('closeMenuBtn');

    // Only add mobile menu functionality if elements exist
    if (hamburgerBtn && mobileMenu && overlay && closeMenuBtn) {
      function openMenu() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      function closeMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }

      hamburgerBtn.addEventListener('click', openMenu);
      closeMenuBtn.addEventListener('click', closeMenu);
      overlay.addEventListener('click', closeMenu);

      // Mobile dropdown toggles
      const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
      dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
          e.stopPropagation();
          const dropdownId = this.getAttribute('data-dropdown');
          const dropdownContent = document.getElementById(dropdownId);
          const arrow = this.querySelector('span:last-child');
          
          if (dropdownContent && arrow) {
            dropdownContent.classList.toggle('active');
            arrow.style.transform = dropdownContent.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
          }
        });
      });

      // Close menu when clicking on mobile links
      const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-dropdown-content a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
      });
    }

    // ===== DARK MODE SECTION =====
    const darkToggle = document.getElementById('darkToggleBtn');
    const mobileDarkToggle = document.getElementById('mobileDarkToggle');
    
    // Function to set dark mode
    function setDarkMode(isDark) {
      if (isDark) {
        document.body.classList.add('dark-mode');
        if (darkToggle) darkToggle.innerHTML = '☀️';
        if (mobileDarkToggle) mobileDarkToggle.innerHTML = '☀️ Light';
      } else {
        document.body.classList.remove('dark-mode');
        if (darkToggle) darkToggle.innerHTML = '🌙';
        if (mobileDarkToggle) mobileDarkToggle.innerHTML = '🌙 Dark';
      }
      localStorage.setItem('chai-dark', isDark ? 'dark' : 'light');
    }

    function toggleDarkMode() {
      setDarkMode(!document.body.classList.contains('dark-mode'));
    }

    // Add event listeners if elements exist
    if (darkToggle) darkToggle.addEventListener('click', toggleDarkMode);
    if (mobileDarkToggle) mobileDarkToggle.addEventListener('click', toggleDarkMode);

    // Load saved dark mode preference
    const savedTheme = localStorage.getItem('chai-dark');
    if (savedTheme === 'dark') setDarkMode(true);

    // ===== RTL SECTION =====
    const rtlToggle = document.getElementById('rtlToggleBtn');
    const mobileRtlToggle = document.getElementById('mobileRtlToggle');
    const html = document.documentElement;

    // Function to set RTL
    function setRTL(isRTL) {
      if (isRTL) {
        html.setAttribute('dir', 'rtl');
        if (rtlToggle) rtlToggle.textContent = 'RTL';
        if (mobileRtlToggle) mobileRtlToggle.textContent = 'RTL';
      } else {
        html.setAttribute('dir', 'ltr');
        if (rtlToggle) rtlToggle.textContent = 'LTR';
        if (mobileRtlToggle) mobileRtlToggle.textContent = 'LTR';
      }
      localStorage.setItem('chai-dir', isRTL ? 'rtl' : 'ltr');
    }

    function toggleRTL() {
      setRTL(html.getAttribute('dir') !== 'rtl');
    }

    // Add event listeners if elements exist
    if (rtlToggle) rtlToggle.addEventListener('click', toggleRTL);
    if (mobileRtlToggle) mobileRtlToggle.addEventListener('click', toggleRTL);

    // Load saved RTL preference
    const savedDir = localStorage.getItem('chai-dir');
    if (savedDir) setRTL(savedDir === 'rtl');

  }); // End DOMContentLoaded
})(); // End IIFE