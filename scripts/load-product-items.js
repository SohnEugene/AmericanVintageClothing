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

      const popupHTML = `
        <div class="popup-overlay" id="added-to-cart-overlay" style="
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;">
          <div class="popup-container" style="
            background: white;
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            position: relative;">
            <button id="added-to-cart-close-btn" style="
              position: absolute;
              top: 10px;
              right: 10px;
              background: transparent;
              border: none;
              font-size: 1.2rem;
              cursor: pointer;">×</button>
            <h2>Added to Cart</h2>
            <img src="${image}" alt="${name}" style="width: 100px; margin: 1rem 0;" />
            <p><strong>${name}</strong></p>
            <p>${price}</p>
          </div>
        </div>
      `;

      const placeholder = document.getElementById('cart-popup-placeholder');
      if (placeholder) {
        placeholder.innerHTML = popupHTML;

        const closeBtn = document.getElementById('added-to-cart-close-btn');
        closeBtn.addEventListener('click', () => {
          document.getElementById('added-to-cart-overlay')?.remove();
        });
      } else {
        console.error('#cart-popup-placeholder not found in the DOM');
      }
    });
  });
}
