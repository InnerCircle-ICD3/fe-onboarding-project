import { formatter } from './constants';

export const createVendingMachineView = (domSelector) => {
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

  /** 상품 버튼 렌더링 */
  const renderProducts = (productsData) => {
    const buttonContainer = domSelector.getButtonContainer();

    const fragment = document.createDocumentFragment();

    for (const product of productsData) {
      const button = createProductButton(product);
      fragment.appendChild(button);
    }

    buttonContainer.appendChild(fragment);
  };

  /** 자판기 남은 금액 */
  const renderBalanceDisplay = (balance) => {
    const vendingMachineBalance = domSelector.getVendingMachineBalance();
    vendingMachineBalance.textContent = `${formatter.format(balance)}원`;
  };

  /** 로그 메시지 렌더링 */
  const renderLogMessage = (message) => {
    const logContainer = domSelector.getLogContainer();
    const logItem = document.createElement('div');
    logItem.className = 'p-1 border-gray-200 text-sm';
    logItem.textContent = `${message}`;
    logContainer?.appendChild(logItem);
  };

  return {
    renderProducts,
    renderBalanceDisplay,
    renderLogMessage,
  };
};
