import { ERROR_MESSAGES, formatter } from './constants';
import { buyProduct, insertMoney, returnMoney } from './services';
import {
  extractDigitsOnly,
  parseNumberWithCommas,
  renderLogMessage,
} from './utils';
import { renderBalanceDisplay } from './view';

/** 금액 입력시 콤마 추가 */
const handlePriceInputWithComma = (e) => {
  const value = extractDigitsOnly(e.target.value);

  if (value) {
    e.target.value = formatter.format(value);
  }
};

/** 금액 투입 기능 */
const handleInsertFormSubmit = (e) => {
  e.preventDefault();

  const priceInput = document.querySelector('.price-input');
  const convertToAmount = parseNumberWithCommas(priceInput.value);

  const { success, amount, updatedBalance, errorCode } =
    insertMoney(convertToAmount);

  if (!success) {
    const errorMessage = ERROR_MESSAGES[errorCode];
    return renderLogMessage(errorMessage);
  }

  renderBalanceDisplay(updatedBalance);
  renderLogMessage(`${formatter.format(amount)}원이 투입되었습니다.`);
  priceInput.value = '';
};

/** 상품 구매 기능 */
const handleBuyProductClick = (e) => {
  const button = e.target.closest('.product-button');
  if (!button) return;

  const productId = button.dataset.id;

  const { success, product, updatedBalance, errorCode } =
    buyProduct(productId);

  if (!success) {
    const errorMessage = ERROR_MESSAGES[errorCode];
    return renderLogMessage(errorMessage);
  }

  renderBalanceDisplay(updatedBalance);
  renderLogMessage(`${product.name}을(를) 구매하셨습니다.`);
};

/** 잔돈 반환 기능 */
const handleReturnMoneyClick = () => {
  const { success, returnBalance, updatedBalance, errorCode } =
    returnMoney();

  if (!success) {
    const errorMessage = ERROR_MESSAGES[errorCode];
    return renderLogMessage(errorMessage);
  }

  renderLogMessage(
    `${formatter.format(returnBalance)}원이 반환되었습니다.`
  );

  renderBalanceDisplay(updatedBalance);
};

/** 이벤트 리스너 설정 */
export const setupEventListeners = () => {
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
