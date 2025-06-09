export async function loadHeader() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (!headerPlaceholder) {
    console.error('[loadHeader] #header-placeholder not found in the DOM');
    return;
  }

  const isMobile = window.innerWidth <= 768;
  const headerPath = isMobile ? '../components/mobile-header.html' : '../components/header.html';

  fetch(headerPath)
    .then(res => {
      if (!res.ok) throw new Error('[loadHeader] Failed to load header');
      return res.text();
    })
    .then(html => {
      headerPlaceholder.innerHTML = html;
    })
    .catch(err => console.error('[loadHeader] Error:', err));
}

export async function loadFooter() {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (!footerPlaceholder) {
    console.error('[loadFooter] #footer-placeholder not found in the DOM');
    return;
  }

  fetch('../components/footer.html')
    .then(res => {
      if (!res.ok) throw new Error('[loadFooter] Failed to load footer');
      return res.text();
    })
    .then(html => {
      footerPlaceholder.innerHTML = html;
    })
    .catch(err => console.error('[loadFooter] Error:', err));
}
