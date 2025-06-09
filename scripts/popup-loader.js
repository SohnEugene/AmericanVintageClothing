export async function loadSearchBar() {
    // load the placeholder element
    const searchBarPlaceholder = document.getElementById('search-bar-placeholder');
    if (!searchBarPlaceholder) {
      console.error('[loadSearchBar] #search-bar-placeholder not found in the DOM');
      return;
    }
  
    // fetch the search bar html
    fetch('../components/search-bar.html')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load search bar');
        return res.text();
      })
      .then(html => {
        searchBarPlaceholder.innerHTML = html;
        setupSearchBarEvents();
      })
      .catch(err => console.error('[loadSearchBar] Error:', err));
}



function setupSearchBarEvents() {
    const searchIcon = document.getElementById('search-icon');
    const searchOverlay = document.querySelector('.popup-overlay');
    const searchCloseBtn = document.querySelector('.popup-close-btn');
  
    if (!searchIcon || !searchOverlay || !searchCloseBtn) return;
  
    searchIcon.addEventListener('click', () => {
      searchOverlay.style.display = 'flex';
      requestAnimationFrame(() => {
        searchOverlay.classList.add('active');
      });
    });
  
    searchCloseBtn.addEventListener('click', () => {
      searchOverlay.classList.remove('active');
      setTimeout(() => {
        searchOverlay.style.display = 'none';
      }, 300);
    });
}



export async function loadLeftMenu() {
    const menuPlaceholder = document.getElementById('left-menu-placeholder');
    if (!menuPlaceholder) {
      console.error('[loadLeftMenu] #left-menu-placeholder not found in the DOM');
      return;
    }
  
    fetch('../components/left-menu.html')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load left-menu.html');
        return res.text();
      })
      .then(html => {
        menuPlaceholder.innerHTML = html;
        setupLeftMenuEvents();
      })
      .catch(err => console.error('[loadLeftMenu] Error:', err));
}



function setupLeftMenuEvents() {
    const menuBtn = document.getElementById('menu-toggle');
    const popup = document.getElementById('left-menu-popup-overlay');
    const closeBtn = popup?.querySelector('.popup-close-btn');
  
    if (!menuBtn || !popup || !closeBtn) {
      console.warn('[setupLeftMenuEvents] Required elements not found');
      return;
    }
  
    // 메뉴 버튼 클릭 시 팝업 표시
    menuBtn.addEventListener('click', () => {
      popup.style.display = 'flex';
      requestAnimationFrame(() => popup.classList.add('active'));
    });
  
    // 닫기 버튼 클릭 시 팝업 숨김
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('active');
      setTimeout(() => {
        popup.style.display = 'none';
      }, 300);
    });
}



export async function loadAddedToCart() {
    // 이 함수는 페이지에 이미 있는 add-to-cart 버튼들을 찾고 이벤트 세팅 함수 호출
    setupAddedToCartEvents();
}
  
function setupAddedToCartEvents() {
    console.log(document);
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    if (!buttons.length) {
      console.warn('[setupAddedToCartEvents] No .add-to-cart-btn found.');
      return;
    }
  
    buttons.forEach(btn => {
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
              console.error('[setupAddedToCartEvents] #cart-popup-placeholder not found');
              return;
            }
  
            placeholder.innerHTML = popupHTML;
  
            requestAnimationFrame(() => {
              const overlay = placeholder.querySelector('.popup-overlay');
              const cartItemPlaceholder = overlay.querySelector('.cart-item-placeholder');
              const closeBtn = overlay.querySelector('.popup-close-btn');
  
              if (!cartItemPlaceholder || !closeBtn) {
                console.error('[setupAddedToCartEvents] popup elements not found');
                return;
              }
  
              overlay.style.display = 'flex';
              requestAnimationFrame(() => {
                overlay.classList.add('active');
              });
  
              // 자동으로 팝업 닫기
              setTimeout(() => {
                overlay.classList.remove('active');
                setTimeout(() => {
                  overlay.style.display = 'none';
                  placeholder.innerHTML = ''; // 팝업 내용 초기화
                }, 400);
              }, 3000);
  
              closeBtn.addEventListener('click', () => {
                overlay.classList.remove('active');
                setTimeout(() => {
                  overlay.style.display = 'none';
                  placeholder.innerHTML = '';
                }, 400);
              });
  
              // cart-item.html 로드해서 상세 정보 넣기
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
                .catch(err => console.error('[setupAddedToCartEvents] Error loading cart-item.html:', err));
            });
          })
          .catch(error => console.error('[setupAddedToCartEvents] Error loading added-to-cart.html:', error));
      });
    });
}
  