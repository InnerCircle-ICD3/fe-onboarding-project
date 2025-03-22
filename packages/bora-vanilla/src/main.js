import './index.css';
import { productService } from './service/productService';

const buttonContainer = document.querySelector(
  '.vending-machine-button-container'
);

const insertForm = document.querySelector(
  '.vending-machine-insert-form'
);
const priceInput = document.querySelector('.price-input');
const logContainer = document.querySelector(
  '.log-message-container > div'
);

// 버튼 렌더링
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

const renderLog = (message) => {
  const logItem = document.createElement('div');
  logItem.className = 'p-1 border-gray-200 text-sm';
  logItem.textContent = `${message}`;
  logContainer.appendChild(logItem);
};

// 금액 입력
insertForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = parseInt(priceInput.value);

  // 양수만 가능
  if (isNaN(amount) || amount <= 0) {
    renderLog('올바른 금액을 입력해주세요.');
    return;
  }

  let balance = 0;
  balance += amount;
  renderLog(`${amount}원이 투입되었습니다.`);
  priceInput.value = '';
});

const init = () => {
  const productsData = productService.getAllProducts();
  renderProducts(productsData);
};

init();
