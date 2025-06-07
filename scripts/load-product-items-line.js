document.addEventListener('DOMContentLoaded', () => {
    fetch('../components/product-item.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load product-item.html');
        return response.text();
      })
      .then(templateHTML => {
        document.body.insertAdjacentHTML('beforeend', templateHTML);
        renderProductsLine();
      })
      .catch(error => console.error('Error loading product item template:', error));
  });
  
  function renderProductsLine() {
    const products = [
        {
          image: "../assets/images/tops1.png",
          name: "Oversized Shirt",
          description: "Relaxed fit with dropped shoulders",
          price: "$89"
        },
        {
          image: "../assets/images/tops2.png",
          name: "Classic Tank",
          description: "Lightweight cotton jersey",
          price: "$39"
        },
        {
          image: "../assets/images/tops3.png",
          name: "Denim Jacket",
          description: "Vintage wash with distressed details",
          price: "$129"
        },
        {
          image: "../assets/images/tops4.png",
          name: "Graphic Tee",
          description: "Soft cotton with bold print",
          price: "$49"
        },
        {
          image: "../assets/images/tops5.png",
          name: "Knitted Sweater",
          description: "Cozy knit with ribbed cuffs",
          price: "$79"
        },
        {
          image: "../assets/images/tops6.png",
          name: "Plaid Flannel Shirt",
          description: "Soft brushed cotton with button-down front",
          price: "$69"
        },
        {
          image: "../assets/images/tops7.png",
          name: "Hooded Sweatshirt",
          description: "Fleece-lined with kangaroo pocket",
          price: "$59"
        },
        {
          image: "../assets/images/tops8.png",
          name: "Belted Blazer",
          description: "Tailored fit with removable belt",
          price: "$149"
        },
        {
          image: "../assets/images/tops9.png",
          name: "Cropped Cardigan",
          description: "Soft knit with button closure",
          price: "$69"
        },
        {
          image: "../assets/images/tops10.png",
          name: "Puffer Vest",
          description: "Lightweight insulation with zip front",
          price: "$99"
        },
        {
          image: "../assets/images/tops11.png",
          name: "Ribbed Turtleneck",
          description: "Stretchy knit with high neck",
          price: "$59"
        },
        {
          image: "../assets/images/tops12.png",
          name: "Linen Button-Up",
          description: "Breathable fabric with relaxed fit",
          price: "$89"
        }
      ];
  
    const container = document.querySelector(".product-line-placeholder");
    const template = document.querySelector("#product-card-template");
  
    if (!container || !template) {
      console.error('product-line-placeholder or template not found.');
      return;
    }
  
    products.forEach(product => {
      const clone = template.content.cloneNode(true);
  
      clone.querySelector(".product-image").src = product.image;
      clone.querySelector(".product-image").alt = product.name;
      clone.querySelector(".product-name").textContent = product.name;
      clone.querySelector(".product-description").textContent = product.description;
      clone.querySelector(".product-price").textContent = product.price;
  
      const addBtn = clone.querySelector(".add-to-cart-btn");
      addBtn.dataset.name = product.name;
      addBtn.dataset.image = product.image;
      addBtn.dataset.price = product.price;
  
      // scroll snap 적용
      const wrapper = document.createElement('div');
      wrapper.style.scrollSnapAlign = "start";
      wrapper.appendChild(clone);
  
      container.appendChild(wrapper);
    });
  
    setupCartPopupEvents();
  }



function setupCartPopupEvents() {
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const image = btn.dataset.image;
      const price = btn.dataset.price;

      // 먼저 added-to-cart.html 로드
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
            const cartItemPlaceholder = overlay.querySelector('.cart-item-placeholder');
            const closeBtn = overlay.querySelector('.popup-close-btn');

            if (!cartItemPlaceholder) {
              console.error('.cart-item-placeholder not found');
              return;
            }

            // 이제 cart-item.html 로드
            fetch('../components/cart-item.html')
              .then(res => {
                if (!res.ok) throw new Error('Failed to load cart-item.html');
                return res.text();
              })
              .then(cartItemHTML => {
                // 문자열 -> DOM 변환
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = cartItemHTML.trim();
                const cartItemEl = tempDiv.firstElementChild;

                // 데이터 채우기
                cartItemEl.querySelector('.cart-item-img').src = image;
                cartItemEl.querySelector('.cart-item-img').alt = name;
                cartItemEl.querySelector('.cart-item-title').textContent = name;
                cartItemEl.querySelector('.cart-item-description').textContent = 'Product Description'; // 필요 시 수정
                cartItemEl.querySelector('.cart-item-price').textContent = price;

                cartItemPlaceholder.innerHTML = ''; // 이전 내용 제거
                cartItemPlaceholder.appendChild(cartItemEl);
              })
              .catch(err => console.error('Error loading cart-item.html:', err));

            // 닫기 버튼 이벤트
            closeBtn.addEventListener('click', () => {
              overlay.remove();
            });
          });
        })
        .catch(error => console.error('Error loading added-to-cart.html:', error));
    });
  });
}
  