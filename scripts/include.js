document.addEventListener('DOMContentLoaded', () => {
  // 1) header 로드
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

  // 2) product 템플릿 로드 및 그리드 렌더링
  fetch('../components/product-card.html')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load product-card.html');
      return response.text();
    })
    .then(templateHTML => {
      document.body.insertAdjacentHTML('beforeend', templateHTML); // <template> 삽입 후 renderProducts 호출
      renderProducts();
    })
    .catch(error => console.error('Error loading product card template:', error));
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
    {      image: "../assets/images/tops3.png",
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
    {      image: "../assets/images/tops5.png",
      name: "Knitted Sweater",
      description: "Cozy knit with ribbed cuffs",
      price: "$79"
    },
    {      image: "../assets/images/tops6.png",
      name: "Plaid Flannel Shirt",
      description: "Soft brushed cotton with button-down front",
      price: "$69"
    },
    {      image: "../assets/images/tops7.png",
      name: "Hooded Sweatshirt",
      description: "Fleece-lined with kangaroo pocket",
      price: "$59"
    },
    {      image: "../assets/images/tops8.png",
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

    productGrid.appendChild(clone);
  });
}
