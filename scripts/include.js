document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  loadFooter();
  loadSearchBar();
});



// === Header ===
function loadHeader() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (!headerPlaceholder) {
    console.error('[loadHeader] #header-placeholder not found in the DOM');
    return;
  }


  // decide which header to load
  const isMobile = window.innerWidth <= 768;
  const headerPath = isMobile
    ? '../components/mobile-header.html'
    : '../components/header.html';


  // fetch the html element
  fetch(headerPath)
  .then(res => {
    if (!res.ok) throw new Error('Failed to load header');
    return res.text(); 
  })
  .then(html => {
    headerPlaceholder.innerHTML = html;
  })
  .catch(err => {
    console.error('[loadHeader] Error:', err);
  });
}



// === Footer ===
function loadFooter() {
  // load the placeholder element
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (!footerPlaceholder) {
    console.error('[loadFooter] #footer-placeholder not found in the DOM');
    return;
  }


  // fetch the footer html
  fetch('../components/footer.html')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load footer');
      return res.text();
    })
    .then(html => {
      footerPlaceholder.innerHTML = html;
    })
    .catch(err => console.error('[loadFooter] Error: ', err));
}



// === Search Bar ===
function loadSearchBar() {
  // load the placeholder element
  const searchBarPlaceholder = document.getElementById('search-bar-placeholder');
  if (!searchBarPlaceholder) {
    console.error('[loadSearchBar] #search-bar-placeholder not found in the DOM');
    return;
  }

  // fetch the search bar html
  fetch('../components/search-bar.html')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load search bar');
      return res.text();
    })
    .then(html => {
      searchBarPlaceholder.innerHTML = html;
      setupSearchBarEvents();
    })
    .catch(err => console.error('[loadSearchBar] Error:', err));
}





// Setup events
// === Search Bar Events ===
function setupSearchBarEvents() {
  const searchIcon = document.getElementById('search-icon');
  const searchOverlay = document.querySelector('.popup-overlay');
  const searchCloseBtn = document.querySelector('.popup-close-btn');

  if (!searchIcon || !searchOverlay || !searchCloseBtn) return;

  searchIcon.addEventListener('click', () => {
    searchOverlay.style.display = 'flex';
    requestAnimationFrame(() => {
      searchOverlay.classList.add('active');
    });
  });

  searchCloseBtn.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    setTimeout(() => {
      searchOverlay.style.display = 'none';
    }, 300);
  });
}


// === Menu Popup ===
function setupMenuButtonEvent() {
  const menuBtn = document.getElementById('menu-toggle');
  const popupRoot = document.getElementById('left-menu-placeholder');
  if (!menuBtn || !popupRoot) return;

  menuBtn.addEventListener('click', async () => {
    let popup = document.getElementById('left-menu-popup-overlay');

    if (!popup) {
      try {
        const response = await fetch('../components/left-menu.html');
        if (!response.ok) throw new Error('Failed to load left-menu.html');
        const html = await response.text();
        popupRoot.innerHTML = html;

        popup = document.getElementById('left-menu-popup-overlay');
        if (!popup) {
          console.error('Popup not found after inserting HTML');
          return;
        }

        bindPopupEvents(popup);

        popup.style.display = 'flex';
        requestAnimationFrame(() => popup.classList.add('active'));

      } catch (err) {
        console.error('Failed to load menu popup:', err);
      }

    } else {
      popup.style.display = 'flex';
      requestAnimationFrame(() => popup.classList.add('active'));
    }
  });
}

function bindPopupEvents(popup) {
  const closeBtn = popup.querySelector('.popup-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('active');
      setTimeout(() => {
        popup.style.display = 'none';
      }, 300);
    });
  }
}
