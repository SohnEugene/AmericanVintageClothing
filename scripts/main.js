import { loadHeader, loadFooter } from './header-footer-loader.js';
import { loadProductItem } from './product-item-loader.js';
import { loadCartItem } from './cart-item-loader.js';
import { loadSearchBar, loadLeftMenu, loadAddedToCart } from './popup-loader.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadHeader();
        await loadFooter();
        await loadProductItem();
        await loadCartItem();
    
        await loadSearchBar();
        await loadLeftMenu();
        await loadAddedToCart();
      } catch (error) {
        console.error('Error during loading:', error);
      }
  });
