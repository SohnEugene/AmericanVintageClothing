// main.js
document.addEventListener('DOMContentLoaded', () => {
    const shopNowBtn = document.getElementById('shop-now-btn');
    if (shopNowBtn) {
      shopNowBtn.addEventListener('click', () => {
        window.location.href = '/tops';
      });
    }
  });
  