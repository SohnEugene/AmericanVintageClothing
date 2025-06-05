const cartItemsContainer = document.getElementById('cart-items');

// 배열로 제품 정보 관리
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

// 각 아이템을 반복해서 로드
cartItems.forEach(item => {
  fetch('../components/cart-item.html')
    .then(response => response.text())
    .then(html => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html.trim();
      const cartItem = tempDiv.firstChild;

      // 이미지, 텍스트 삽입
      cartItem.querySelector('.cart-item-img').src = item.image;
      cartItem.querySelector('.cart-item-title').textContent = item.name;
      cartItem.querySelector('.cart-item-description').textContent = item.description;
      cartItem.querySelector('.cart-item-price').textContent = item.price;

      // 추가
      cartItemsContainer.appendChild(cartItem);
    });
});

