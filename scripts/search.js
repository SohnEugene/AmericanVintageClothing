document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.getElementById('search-icon');
  const searchOverlay = document.querySelector('.popup-overlay');
  const searchCloseBtn = document.getElementById('search-close-btn');

  console.log('searchIcon:', searchIcon);
  console.log('searchOverlay:', searchOverlay);
  console.log('searchCloseBtn:', searchCloseBtn);

  if (searchIcon && searchOverlay && searchCloseBtn) {
    searchIcon.addEventListener('click', () => {
      searchOverlay.style.display = 'flex';
    });

    searchCloseBtn.addEventListener('click', () => {
      searchOverlay.style.display = 'none';
    });
  }
});
