import products from './db/productsData';
import './index.css';
import {
  extractDigitsOnly,
  parseNumberWithCommas,
  renderLog,
} from './utils';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  setupEventListeners();
});

let balance = 0;
const formatter = new Intl.NumberFormat();

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

/** 이벤트 리스너 설정 */
const setupEventListeners = () => {
  const insertForm = document.querySelector(
    '.vending-machine-insert-form'
  );
  const returnMoneyButton = '.return-money-button';
  const priceInput = document.querySelector('.price-input');

  // 금액 입력시 콤마 추가
  priceInput.addEventListener('input', handlePriceInputWithComma);

  // 금액 투입
  insertForm.addEventListener('submit', handleInsertFormSubmit);
};

const handlePriceInputWithComma = (e) => {
  const value = extractDigitsOnly(e.target.value);

  if (value) {
    e.target.value = formatter.format(value);
  }
};

const handleInsertFormSubmit = (e) => {
  const priceInput = document.querySelector('.price-input');

  e.preventDefault();
  const amount = parseNumberWithCommas(priceInput.value);

  // 양수만 가능
  if (Number.isNaN(amount) || amount <= 0) {
    renderLog('올바른 금액을 입력해주세요.');
    return;
  }

  balance += amount;
  renderLog(`${formatter.format(amount)}원이 투입되었습니다.`);
  setVendingMachineBalance(balance);
  priceInput.value = '';
};

const setVendingMachineBalance = (balance) => {
  const vendingMachineBalance = document.querySelector(
    '.vending-machine-balance'
  );
  vendingMachineBalance.textContent = `${formatter.format(
    balance
  )}원`;
};
