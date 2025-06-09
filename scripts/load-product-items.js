document.addEventListener('DOMContentLoaded', () => {
  fetch('../components/product-item.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load product-item.html');
      return response.text();
    })
    .then(templateHTML => {
      document.body.insertAdjacentHTML('beforeend', templateHTML);
      renderProducts();
    })
    .catch(error => console.error('Error loading product item template:', error));
});

function renderProducts() {
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

  // 필터 적용 (예: search 페이지)
  const isSearchPage = window.location.pathname.includes('search');
  const filteredProducts = isSearchPage
    ? products.filter(product => product.name.toLowerCase().includes('shirt'))
    : products;

  const gridContainer = document.querySelector('.product-grid');
  const lineContainers = document.querySelectorAll('.product-line-placeholder');
  const template = document.querySelector('#product-card-template');

  if (!template) {
    console.error('Product template not found.');
    return;
  }

  if (gridContainer) {
    // 일반 그리드 렌더링
    filteredProducts.forEach(product => {
      const clone = createProductCard(template, product);
      gridContainer.appendChild(clone);
    });
  }

  if (lineContainers.length > 0) {
    // 슬라이드 라인 렌더링
    lineContainers.forEach(container => {
      filteredProducts.forEach(product => {
        const clone = createProductCard(template, product);
        const wrapper = document.createElement('div');
        wrapper.style.scrollSnapAlign = "start";
        wrapper.appendChild(clone);
        container.appendChild(wrapper);
      });
    });
  }

  setupCartPopupEvents();
}

function createProductCard(template, product) {
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

  return clone;
}

function setupCartPopupEvents() {
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const image = btn.dataset.image;
      const price = btn.dataset.price;

      fetch('../components/added-to-cart.html')
        .then(response => {
          if (!response.ok) throw new Error('Failed to load added-to-cart.html');
          return response.text();
        })
        .then(popupHTML => {
          const placeholder = document.getElementById('cart-popup-placeholder');
          if (!placeholder) {
            console.error('#cart-popup-placeholder not found');
            return;
          }

          placeholder.innerHTML = popupHTML;

          requestAnimationFrame(() => {
            const overlay = placeholder.querySelector('.popup-overlay');
            const cartItemPlaceholder = overlay.querySelector('.cart-item-placeholder');
            const closeBtn = overlay.querySelector('.popup-close-btn');

            if (!cartItemPlaceholder) {
              console.error('.cart-item-placeholder not found');
              return;
            }

            // 팝업 보이기
            requestAnimationFrame(() => {
              overlay.classList.add('active');
            });

            // ✅ 3초 뒤 자동으로 닫기
            setTimeout(() => {
              overlay.classList.remove('active');
              setTimeout(() => {
                overlay.remove();
              }, 400); // transition 시간 고려
            }, 3000); // 3초

            // 수동 닫기
            closeBtn.addEventListener('click', () => {
              overlay.classList.remove('active');
              setTimeout(() => {
                overlay.remove();
              }, 400);
            });

            // 장바구니 항목 로드
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
          });
        })
        .catch(error => console.error('Error loading added-to-cart.html:', error));
    });
  });
}