import { setupEventListeners } from './controller';
import products from './db/productsData';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  setupEventListeners();
});

/** 상품 버튼 렌더링 */
const renderProducts = (productsData) => {
  const buttonContainer = document.querySelector(
    '.vending-machine-button-container'
  );

  const fragment = document.createDocumentFragment();

  for (const product of productsData) {
    const button = createProductButton(product);
    fragment.appendChild(button);
  }

  buttonContainer.appendChild(fragment);
};

/** 상품 버튼 생성 */
const createProductButton = (product) => {
  const button = document.createElement('button');
  button.className =
    'product-button relative flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-200';

  button.dataset.id = product.id;

  // 상품명
  const name = document.createElement('div');
  name.className = 'product-name font-semibold text-gray-800';
  name.textContent = product.name;

  // 가격
  const price = document.createElement('div');
  price.className = 'product-price text-blue-600 font-bold';
  price.textContent = `${product.price}원`;

  button.appendChild(name);
  button.appendChild(price);

  return button;
};
