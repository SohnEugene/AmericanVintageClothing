document.addEventListener('DOMContentLoaded', () => {
  // === Load Header ===
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    const isMobile = window.innerWidth <= 768;
    const headerPath = isMobile ? '../components/mobile-header.html' : '../components/header.html';

    fetch(headerPath)
      .then(response => {
        if (!response.ok) throw new Error('Failed to load header');
        return response.text();
      })
      .then(data => {
        headerPlaceholder.innerHTML = data;

        setupSearchBarEvents();
        setupMenuButtonEvent();
      })
      .catch(error => console.error('Error loading header:', error));
  }


  // === Load Footer ===
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    fetch('../components/footer.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load footer.html');
        return response.text();
      })
      .then(data => {
        footerPlaceholder.innerHTML = data;
      })
      .catch(error => console.error('Error loading footer:', error));
  }

  // === Load Search Bar ===
  const searchBarPlaceholder = document.getElementById('search-bar-placeholder');
  if (searchBarPlaceholder) {
    fetch('../components/search-bar.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load search-bar.html');
        return response.text();
      })
      .then(data => {
        searchBarPlaceholder.innerHTML = data;
        // Ensure event listeners run if header was already loaded
        setupSearchBarEvents();
      })
      .catch(error => console.error('Error loading search bar:', error));
  }

  // === Event binding logic ===
  function setupSearchBarEvents() {
    const searchIcon = document.getElementById('search-icon');
    const searchOverlay = document.querySelector('.popup-overlay');
    const searchCloseBtn = document.querySelector('.popup-close-btn');

    console.log('searchIcon:', searchIcon);
    console.log('searchOverlay:', searchOverlay);
    console.log('searchCloseBtn:', searchCloseBtn);

    if (searchIcon && searchOverlay && searchCloseBtn) {
      searchIcon.addEventListener('click', () => {
        console.log('Search icon clicked');
        searchOverlay.style.display = 'flex';
      });

      searchCloseBtn.addEventListener('click', () => {
        console.log('Close button clicked');
        searchOverlay.style.display = 'none';
      });
    }
  }

  // === Menu popup events ===
  function setupMenuButtonEvent() {
    const menuBtn = document.getElementById('menu-toggle');
    const popupRoot = document.getElementById('left-menu-placeholder');
  
    console.log('[setupMenuButtonEvent] menuBtn:', menuBtn);
    console.log('[setupMenuButtonEvent] popupRoot:', popupRoot);
  
    if (!menuBtn || !popupRoot) {
      console.warn('[setupMenuButtonEvent] menuBtn 또는 popupRoot가 없습니다.');
      return;
    }
  
    menuBtn.addEventListener('click', async () => {
      console.log('[menuBtn click] 메뉴 버튼 클릭됨');
  
      let popup = document.getElementById('left-menu-popup-overlay');
      console.log('[menuBtn click] 기존 popup:', popup);
  
      if (!popup) {
        try {
          console.log('[menuBtn click] left-menu.html을 fetch 중...');
          const response = await fetch('../components/left-menu.html');
          if (!response.ok) throw new Error('left-menu.html fetch 실패');
  
          const html = await response.text();
          console.log('[menuBtn click] left-menu.html 로드 완료');
          popupRoot.innerHTML = html;
  
          popup = document.getElementById('left-menu-popup-overlay');
          console.log('[menuBtn click] 새로 삽입된 popup:', popup);
  
          const closeBtn = popup.querySelector('.popup-close-btn');
          console.log('[menuBtn click] closeBtn:', closeBtn);
  
          if (closeBtn) {
            closeBtn.addEventListener('click', () => {
              console.log('[closeBtn click] 닫기 버튼 클릭됨');
              popup.style.display = 'none';
            });
          } else {
            console.warn('[menuBtn click] closeBtn을 찾을 수 없습니다.');
          }
  
        } catch (err) {
          console.error('[menuBtn click] 메뉴 로딩 실패:', err);
        }
      } else {
        console.log('[menuBtn click] 기존 popup을 보여줌');
        popup.style.display = 'flex';
      }
    });
  }
  
});
