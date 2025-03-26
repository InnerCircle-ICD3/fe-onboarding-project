import products from './db/productsData';
import './index.css';
import {
  decrementBalance,
  getBalance,
  incrementBalance,
  resetBalance,
} from './store';
import {
  extractDigitsOnly,
  parseNumberWithCommas,
  renderLog,
} from './utils';

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  setupEventListeners();
});

const MAX_AMOUNT = 1000000;
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

  const buttonContainer = document.querySelector(
    '.vending-machine-button-container'
  );

  // 금액 입력시 콤마 추가
  priceInput.addEventListener('input', handlePriceInputWithComma);

  // 금액 투입
  insertForm.addEventListener('submit', handleInsertFormSubmit);

  // 잔돈 반환
  returnMoneyButton.addEventListener('click', handleReturnMoneyClick);

  // 상품 구매
  buttonContainer.addEventListener('click', handleBuyProductClick);
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

  // 최대 금액 제한
  if (amount > MAX_AMOUNT) {
    renderLog(
      `최대 ${formatter.format(MAX_AMOUNT)}원까지만 투입 가능합니다.`
    );
    return;
  }

  // 투입 금액 업데이트
  incrementBalance(amount);

  // 자판기 남은 금액 업데이트
  setVendingMachineBalance(getBalance());

  // 로그 출력
  renderLog(`${formatter.format(amount)}원이 투입되었습니다.`);

  priceInput.value = '';
};

/** 상품 구매 기능 */
const handleBuyProductClick = (e) => {
  const button = e.target.closest('.product-button');
  if (!button) return;

  const productId = button.dataset.id;

  const product = products.find(
    (product) => product.id === Number(productId)
  );

  const currentBalance = getBalance();

  if (currentBalance < product.price) {
    renderLog('잔액이 부족합니다.');
    return;
  }

  // 잔액 업데이트
  decrementBalance(product.price);
  setVendingMachineBalance(getBalance());
  renderLog(`${product.name}을(를) 구매하셨습니다.`);
};

/** 잔돈 반환 기능 */
const handleReturnMoneyClick = () => {
  const currentBalance = getBalance();
  renderLog(
    `${formatter.format(currentBalance)}원이 반환되었습니다.`
  );
  resetBalance();
  setVendingMachineBalance(getBalance());
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
