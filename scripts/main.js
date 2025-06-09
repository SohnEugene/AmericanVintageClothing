import { loadHeader, loadFooter } from './header-footer-loader.js';
import { loadProductItem } from './product-item-loader.js';

document.addEventListener('DOMContentLoaded', () => {
  loadHeader();
  loadFooter();
  loadProductItem();
});
