import './index.css';
import { productService } from './service/productService';

const buttonContainer = document.querySelector(
  '.vending-machine-button-container'
);

const renderProducts = (productsData) => {
  const productButtons = productsData
    .map((product) => {
      return `
      <button
        class="product-button relative flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-200"
        data-id="${product.id}"
        data-price="${product.price}"
        data-name="${product.name}"
      >
        <div class="product-name font-semibold text-gray-800">${product.name}</div>
        <div class="product-price text-blue-600 font-bold">${product.price}원</div>
      </button>
    `;
    })
    .join('');

  buttonContainer.innerHTML = productButtons;
};

const productsData = productService.getAllProducts();
renderProducts(productsData);
