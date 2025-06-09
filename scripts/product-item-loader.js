const products = [
    { image: "../assets/images/tops1.png", name: "Oversized Shirt", description: "Relaxed fit with dropped shoulders", price: "$89" },
    { image: "../assets/images/tops2.png", name: "Classic Tank", description: "Lightweight cotton jersey", price: "$39" },
    { image: "../assets/images/tops3.png", name: "Denim Jacket", description: "Vintage wash with distressed details", price: "$129" },
    { image: "../assets/images/tops4.png", name: "Graphic Tee", description: "Soft cotton with bold print", price: "$49" },
    { image: "../assets/images/tops5.png", name: "Knitted Sweater", description: "Cozy knit with ribbed cuffs", price: "$79" },
    { image: "../assets/images/tops6.png", name: "Plaid Flannel Shirt", description: "Soft brushed cotton with button-down front", price: "$69" },
    { image: "../assets/images/tops7.png", name: "Hooded Sweatshirt", description: "Fleece-lined with kangaroo pocket", price: "$59" },
    { image: "../assets/images/tops8.png", name: "Belted Blazer", description: "Tailored fit with removable belt", price: "$149" },
    { image: "../assets/images/tops9.png", name: "Cropped Cardigan", description: "Soft knit with button closure", price: "$69" },
    { image: "../assets/images/tops10.png", name: "Puffer Vest", description: "Lightweight insulation with zip front", price: "$99" },
    { image: "../assets/images/tops11.png", name: "Ribbed Turtleneck", description: "Stretchy knit with high neck", price: "$59" },
    { image: "../assets/images/tops12.png", name: "Linen Button-Up", description: "Breathable fabric with relaxed fit", price: "$89" }
];



export async function loadProductItem() {
    try {
      await loadProductTemplate();
  
      if (document.querySelector('.product-grid')) {
        renderProducts();
      }

      if (document.querySelector('.product-line-placeholder')) {
        renderProductsLine();
      }
  
    } catch (error) {
      console.error('Error in loadProductItem:', error);
    }
  }
  


// for grid
function renderProducts() {
    const isSearchPage = window.location.pathname.includes('search');
    const filteredProducts = isSearchPage
      ? products.filter(product => product.name.toLowerCase().includes('shirt'))
      : products;
  
    const gridContainer = document.querySelector('.product-grid');
    const template = document.querySelector('#product-card-template');
  
    if (!template) {
      console.error('Product template not found.');
      return;
    }
  
    if (gridContainer) {
      filteredProducts.forEach(product => {
        const clone = createProductCard(template, product);
        gridContainer.appendChild(clone);
      });
    }
}
  
  
// for line
function renderProductsLine() {
    const containers = document.querySelectorAll(".product-line-placeholder");
    const template = document.querySelector("#product-card-template");
  
    if (!containers.length || !template) {
      console.error('No product-line-placeholder or template found.');
      return;
    }
  
    containers.forEach(container => {
      products.forEach(product => {
        const clone = createProductCard(template, product);
        const wrapper = document.createElement('div');
        wrapper.style.scrollSnapAlign = "start";
        wrapper.appendChild(clone);
        container.appendChild(wrapper);
      });
    });
}
  


// for template loading
function loadProductTemplate() {
    return fetch('../components/product-item.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load product-item.html');
        return response.text();
      })
      .then(templateHTML => {
        document.body.insertAdjacentHTML('beforeend', templateHTML);
      })
      .catch(error => {
        console.error('Error loading product item template:', error);
        throw error;
      });
}



// for creating product cards using const products
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
  
