document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.btn-default');

  if (!btn) {
    console.error('Add to Cart button not found');
    return;
  }

  btn.addEventListener('click', () => {
    const name = "LEVI’S Vintage Mens Western Shirt";
    const image = "../assets/images/tops2.png";
    const price = "$79";

    fetch('../components/added-to-cart.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load added-to-cart.html');
        return response.text();
      })
      .then(popupHTML => {
        const placeholder = document.getElementById('cart-popup-placeholder');
        if (!placeholder) {
          console.error('#cart-popup-placeholder not found in the DOM');
          return;
        }

        // popup 삽입
        placeholder.innerHTML = popupHTML;

        requestAnimationFrame(() => {
          const overlay = placeholder.querySelector('.popup-overlay');
          const cartItemPlaceholder = overlay?.querySelector('.cart-item-placeholder');
          const closeBtn = overlay?.querySelector('.popup-close-btn');

          if (!overlay || !cartItemPlaceholder || !closeBtn) {
            console.error('Overlay or its children not found');
            return;
          }

          // ⭐ Add active class to trigger transition ⭐
          setTimeout(() => {
            overlay.classList.add('active');
          }, 10);

          // cart-item.html 불러오기
          fetch('../components/cart-item.html')
            .then(res => {
              if (!res.ok) throw new Error('Failed to load cart-item.html');
              return res.text();
            })
            .then(cartItemHTML => {
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = cartItemHTML.trim();
              const cartItemEl = tempDiv.firstElementChild;

              cartItemEl.querySelector('.cart-item-img').src = image;
              cartItemEl.querySelector('.cart-item-img').alt = name;
              cartItemEl.querySelector('.cart-item-title').textContent = name;
              cartItemEl.querySelector('.cart-item-description').textContent = 'Product Description';
              cartItemEl.querySelector('.cart-item-price').textContent = price;

              cartItemPlaceholder.innerHTML = '';
              cartItemPlaceholder.appendChild(cartItemEl);
            })
            .catch(err => console.error('Error loading cart-item.html:', err));

          // 닫기 버튼 이벤트
          closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            setTimeout(() => {
              overlay.remove();
            }, 300); // CSS transition-duration과 일치시킬 것
          });
        });
      })
      .catch(error => console.error('Error loading added-to-cart.html:', error));
  });
});
