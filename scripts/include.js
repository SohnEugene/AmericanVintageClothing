document.addEventListener('DOMContentLoaded', () => {
  // === Load Header ===
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    fetch('../components/header.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load header.html');
        return response.text();
      })
      .then(data => {
        headerPlaceholder.innerHTML = data;

        // Wait for search bar to load before registering event listeners
        setupSearchBarEvents();
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
    const searchCloseBtn = document.getElementById('search-close-btn');

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
});
