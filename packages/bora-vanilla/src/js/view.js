import { formatter } from './utils';

export const createVendingMachineView = (domSelector) => {
  let eventHandlers = {
    onMoneyAmountInput: (value) => value,
    onMoneyInsert: (amount) => {},
    onProductPurchase: (productId) => {},
    onMoneyReturn: () => {},
    onPurchaseValidate: (productId) => {},
    onPurchaseValidateEnd: (product) => {},
  };

  /** 상품 버튼 생성 */
  const createProductButton = (product) => {
    const button = document.createElement('button');

    button.className = `product-button relative flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-200 ${
      product.disabled
        ? 'button-disabled opacity-50 cursor-not-allowed'
        : 'group hover:border-blue-500 active:border-red-500'
    }`;

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
    const buttonContainer = domSelector.getProductButtonContainer();

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

  /** 금액 입력 필드  */
  const getMoneyInputValue = () => {
    return domSelector.getMoneyAmountInput().value;
  };

  /** 금액 입력 필드 설정 */
  const setMoneyInputValue = (value) => {
    domSelector.getMoneyAmountInput().value = value;
  };

  /** 금액 입력 필드 초기화 */
  const clearMoneyInput = () => {
    setMoneyInputValue('');
  };

  /** 이벤트 핸들러 설정 */
  const setEventHandlers = (handlers) => {
    eventHandlers = { ...eventHandlers, ...handlers };
  };

  /** 이벤트 바인딩 */
  const bindEventListeners = () => {
    const moneyAmountInput = domSelector.getMoneyAmountInput();
    const moneyInsertForm = domSelector.getMoneyInsertForm();
    const productButtonContainer = domSelector.getProductButtonContainer();
    const moneyReturnButton = domSelector.getMoneyReturnButton();

    // 금액 입력 이벤트
    moneyAmountInput.addEventListener('input', (e) => {
      const formattedValue = eventHandlers.onMoneyAmountInput(e.target.value);
      setMoneyInputValue(formattedValue);
    });

    // 금액 투입 이벤트
    moneyInsertForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputValue = getMoneyInputValue();
      eventHandlers.onMoneyInsert(inputValue);
    });

    // 상품 구매 이벤트
    productButtonContainer.addEventListener('click', (e) => {
      const button = e.target.closest('.product-button');

      if (!button) return;

      const productId = button.dataset.id;

      eventHandlers.onProductPurchase(productId);
    });

    // 잔돈 반환 이벤트
    moneyReturnButton.addEventListener('click', () => {
      eventHandlers.onMoneyReturn();
    });

    // 상품 버튼 마우스 이벤트
    productButtonContainer.addEventListener('mousedown', (e) => {
      const button = e.target.closest('.product-button');

      if (!button) return;

      const productId = button.dataset.id;
      eventHandlers.onPurchaseValidate(productId);
    });

    productButtonContainer.addEventListener('mouseup', () => {
      eventHandlers.onPurchaseValidateEnd();
    });

    productButtonContainer.addEventListener('mouseleave', () => {
      eventHandlers.onPurchaseValidateEnd();
    });
  };

  return {
    renderProducts,
    renderBalanceDisplay,
    renderLogMessage,
    getMoneyInputValue,
    clearMoneyInput,
    setEventHandlers,
    bindEventListeners,
  };
};
