document.addEventListener('DOMContentLoaded', () => {
  // header 로드
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    fetch('../components/header.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load header.html');
        return response.text();
      })
      .then(data => {
        headerPlaceholder.innerHTML = data;
      })
      .catch(error => console.error('Error loading header:', error));
  }

  // footer 로드
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
});
