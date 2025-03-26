import { ERROR_MESSAGES, formatter } from './constants';
import { buyProduct, insertMoney } from './services';
import {
  extractDigitsOnly,
  parseNumberWithCommas,
  renderLog,
} from './utils';
import { setVendingMachineBalance } from './view';

/** 금액 입력시 콤마 추가 */
export const handlePriceInputWithComma = (e) => {
  const value = extractDigitsOnly(e.target.value);

  if (value) {
    e.target.value = formatter.format(value);
  }
};

/** 금액 투입 기능 */
export const handleInsertFormSubmit = (e) => {
  e.preventDefault();

  const priceInput = document.querySelector('.price-input');
  const convertToAmount = parseNumberWithCommas(priceInput.value);

  const { success, amount, updateBalance, errorCode } =
    insertMoney(convertToAmount);

  if (!success) {
    const errorMessage = ERROR_MESSAGES[errorCode];
    return renderLog(errorMessage);
  }

  // 자판기 업데이트
  setVendingMachineBalance(updateBalance);
  renderLog(`${formatter.format(amount)}원이 투입되었습니다.`);
  priceInput.value = '';
};

/** 상품 구매 기능 */
export const handleBuyProductClick = (e) => {
  const button = e.target.closest('.product-button');
  if (!button) return;

  const productId = button.dataset.id;

  const { success, product, updatedBalance, errorCode } =
    buyProduct(productId);

  if (!success) {
    const errorMessage = ERROR_MESSAGES[errorCode];
    return renderLog(errorMessage);
  }

  // 자판기 업데이트
  setVendingMachineBalance(updatedBalance);
  renderLog(`${product.name}을(를) 구매하셨습니다.`);
};
