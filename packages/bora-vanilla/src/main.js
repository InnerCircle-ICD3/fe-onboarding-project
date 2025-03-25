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
  const returnMoneyButton = document.querySelector(
    '.return-money-button'
  );
  const priceInput = document.querySelector('.price-input');

  // 금액 입력시 콤마 추가
  priceInput.addEventListener('input', handlePriceInputWithComma);

  // 금액 투입
  insertForm.addEventListener('submit', handleInsertFormSubmit);

  // 잔돈 반환
  returnMoneyButton.addEventListener('click', handleReturnMoneyClick);
};

/** 금액 입력시 콤마 추가 */
const handlePriceInputWithComma = (e) => {
  const value = extractDigitsOnly(e.target.value);

  if (value) {
    e.target.value = formatter.format(value);
  }
};

/** 금액 투입 기능 */
const handleInsertFormSubmit = (e) => {
  const priceInput = document.querySelector('.price-input');

  e.preventDefault();
  const amount = parseNumberWithCommas(priceInput.value);

  /** Number.isFinite()
   * - 숫자가 아닌 모든 입력을 거부합니다.
   * - Infinity, NaN을 거부합니다.
   */
  if (!Number.isFinite(amount) || amount <= 0) {
    renderLog('올바른 금액을 입력해주세요.');
    return;
  }

  // 투입 금액 업데이트
  balance += amount;

  // 자판기 남은 금액 업데이트
  setVendingMachineBalance(balance);

  // 로그 출력
  renderLog(`${formatter.format(amount)}원이 투입되었습니다.`);

  priceInput.value = '';
};

/** 잔돈 반환 기능 */
const handleReturnMoneyClick = () => {
  renderLog(`${formatter.format(balance)}원이 반환되었습니다.`);
  setVendingMachineBalance(0);
};

/** 자판기 남은 금액 */
const setVendingMachineBalance = (balance) => {
  const vendingMachineBalance = document.querySelector(
    '.vending-machine-balance'
  );
  vendingMachineBalance.textContent = `${formatter.format(
    balance
  )}원`;
};
