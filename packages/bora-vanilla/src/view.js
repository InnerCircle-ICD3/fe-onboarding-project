import { formatter } from './constants';

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

/** 자판기 남은 금액 */
const renderBalanceDisplay = (balance) => {
  const vendingMachineBalance = document.querySelector(
    '.vending-machine-balance'
  );
  vendingMachineBalance.textContent = `${formatter.format(
    balance
  )}원`;
};

/** 로그 메시지 렌더링 */
const renderLogMessage = (message) => {
  const logContainer = document.querySelector(
    '.log-message-container > div'
  );

  const logItem = document.createElement('div');
  logItem.className = 'p-1 border-gray-200 text-sm';
  logItem.textContent = `${message}`;
  logContainer?.appendChild(logItem);
};

export {
  createProductButton,
  renderBalanceDisplay,
  renderLogMessage,
  renderProducts,
};
