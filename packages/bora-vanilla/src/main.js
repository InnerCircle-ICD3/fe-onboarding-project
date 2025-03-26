import { setupEventListeners } from './controller';
import './index.css';
import { store } from './store';
import { renderProducts } from './view';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(store.getProducts());
  setupEventListeners();
});
