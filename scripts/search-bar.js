document.addEventListener('DOMContentLoaded', () => {
  // Helper 함수: fetch & 삽입
  function loadComponent(id, url) {
    const placeholder = document.getElementById(id);
    if (!placeholder) return Promise.resolve();
    return fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${url}`);
        return res.text();
      })
      .then(html => {
        placeholder.innerHTML = html;
      })
      .catch(err => console.error(err));
  }

  // 순서 상관없으면 Promise.all로 병렬 로드 가능
  Promise.all([
    loadComponent('header-placeholder', '../components/header.html'),
    loadComponent('footer-placeholder', '../components/footer.html'),
    loadComponent('search-bar-placeholder', '../components/search-bar.html'),
  ]).catch(console.error);
});
