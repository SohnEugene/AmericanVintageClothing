const cartItems = [
  {
    image: '../assets/images/tops1.png',
    name: "Levi’s Vintage BIG E Western Shirt",
    description: "Size: L · Cotton/Poly",
    price: "$89"
  },
  {
    image: '../assets/images/tops2.png',
    name: "Lee Classic Denim Shirt",
    description: "Size: M · 100% Cotton",
    price: "$79"
  }
];



export async function loadCartItem(containerId = 'cart-items') {
  const cartItemsContainer = document.getElementById(containerId);
  if (!cartItemsContainer) {
    return;
  }

  const promises = cartItems.map(async (item) => {
    try {
      const response = await fetch('../components/cart-item.html');
      if (!response.ok) throw new Error('Failed to load cart-item.html');
      const html = await response.text();

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html.trim();
      const cartItem = tempDiv.firstElementChild;

      cartItem.querySelector('.cart-item-img').src = item.image;
      cartItem.querySelector('.cart-item-title').textContent = item.name;
      cartItem.querySelector('.cart-item-description').textContent = item.description;
      cartItem.querySelector('.cart-item-price').textContent = item.price;

      cartItemsContainer.appendChild(cartItem);
    } catch (err) {
      console.error('Error loading a cart item:', err);
    }
  });

  await Promise.all(promises);
}