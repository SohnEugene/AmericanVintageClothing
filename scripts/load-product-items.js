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
  let products = [
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

  if (window.location.pathname.includes('search')) {
    products = products.filter(product =>
      product.name.toLowerCase().includes('shirt')
    );
  }

  const productGrid = document.querySelector(".product-grid");
  const template = document.querySelector("#product-card-template");

  if (!productGrid || !template) {
    console.error('productGrid or product template not found.');
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

    productGrid.appendChild(clone);
  });

  setupCartPopupEvents();
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
            console.error('#cart-popup-placeholder not found in the DOM');
            return;
          }

          placeholder.innerHTML = popupHTML;

          requestAnimationFrame(() => {
            const overlay = placeholder.querySelector('.popup-overlay');
            const wrapper = overlay.querySelector('#cart-item-wrapper');

            // product info를 동적으로 삽입
            wrapper.innerHTML = `
              <img src="${image}" alt="${name}" class="popup-product-image" style="width: 100px; margin-bottom: 1rem;" />
              <div class="popup-product-name"><strong>${name}</strong></div>
              <div class="popup-product-price">${price}</div>
            `;

            // 닫기 버튼 동작
            const closeBtn = overlay.querySelector('.popup-close-btn');
            closeBtn.addEventListener('click', () => {
              overlay.remove();
            });
          });
        })
        .catch(error => console.error('Error loading added-to-cart.html:', error));
    });
  });
}

