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

// 상품 렌더링
const renderProducts = (productsData) => {
  console.log(productsData, 'productsData');

  const fragment = document.createDocumentFragment();

  for (const product of productsData) {
    const button = createProductButton(product);
    fragment.appendChild(button);
  }

  buttonContainer.appendChild(fragment);
};

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

const renderLog = (message) => {
  const logItem = document.createElement('div');
  logItem.className = 'p-1 border-gray-200 text-sm';
  logItem.textContent = `${message}`;
  logContainer?.appendChild(logItem);
};

// 금액 입력
insertForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const amount = Number.parseInt(priceInput.value);

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
  const buttonData = productService.getAllProducts();
  renderProducts(buttonData);
};

init();
