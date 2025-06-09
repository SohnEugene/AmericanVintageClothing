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
        setupSearchBarEvents();
      })
      .catch(error => console.error('Error loading search bar:', error));
  }




  // Search Bar Events
  function setupSearchBarEvents() {
    const searchIcon = document.getElementById('search-icon');
    const searchOverlay = document.querySelector('.popup-overlay');
    const searchCloseBtn = document.querySelector('.popup-close-btn');
  
    if (searchIcon && searchOverlay && searchCloseBtn) {
      searchIcon.addEventListener('click', () => {
        searchOverlay.style.display = 'flex'; // 먼저 표시
        requestAnimationFrame(() => {
          searchOverlay.classList.add('active'); // 트랜지션 시작
        });
      });
  
      searchCloseBtn.addEventListener('click', () => {
        searchOverlay.classList.remove('active'); // 트랜지션 시작
        setTimeout(() => {
          searchOverlay.style.display = 'none'; // 끝나고 숨김
        }, 300); // transition duration 과 동일하게
      });
    }
  }



  // Added to Cart Events
  function setupMenuButtonEvent() {
    const menuBtn = document.getElementById('menu-toggle');
    const popupRoot = document.getElementById('left-menu-placeholder');
  
    console.log('[setupMenuButtonEvent] menuBtn:', menuBtn);
    console.log('[setupMenuButtonEvent] popupRoot:', popupRoot);
  
    if (!menuBtn || !popupRoot) return;
  
    menuBtn.addEventListener('click', async () => {
      let popup = document.getElementById('left-menu-popup-overlay');
  
      if (!popup) {
        try {
          const response = await fetch('../components/left-menu.html');
          if (!response.ok) throw new Error('Failed to fetch left-menu.html');
  
          const html = await response.text();
          popupRoot.innerHTML = html;
  
          popup = document.getElementById('left-menu-popup-overlay');
  
          if (!popup) {
            console.error('Popup not found after inserting HTML');
            return;
          }
  
          // 처음 열 때 display: flex → 다음 프레임에 active
          popup.style.display = 'flex';
          requestAnimationFrame(() => {
            popup.classList.add('active');
          });
  
          const closeBtn = popup.querySelector('.popup-close-btn');
          if (closeBtn) {
            closeBtn.addEventListener('click', () => {
              popup.classList.remove('active');
              setTimeout(() => {
                popup.style.display = 'none';
              }, 300); // CSS transition duration과 동일하게
            });
          }
        } catch (err) {
          console.error('Failed to load menu popup:', err);
        }
      } else {
        // 이미 로드된 경우 열기
        popup.style.display = 'flex';
        requestAnimationFrame(() => {
          popup.classList.add('active');
        });
      }
    });
  }
});