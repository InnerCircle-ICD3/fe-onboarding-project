import { ERROR_MESSAGES } from './constants';
import { buyProduct, insertMoney, returnMoney } from './services';
import { formatDigitsWithCommas, formatter, parseNumberWithCommas } from './utils';

export const createVendingMachineController = (view) => {
  /** 금액 입력시 콤마 추가 */
  const handleMoneyAmountInput = (value) => {
    return value ? formatDigitsWithCommas(value) : '';
  };

  /** 금액 투입 기능 */
  const handleMoneyInsert = (value) => {
    e.preventDefault();

    const priceInput = document.querySelector('.price-input');
    const convertToAmount = parseNumberWithCommas(priceInput.value);

    const { success, amount, updatedBalance, errorCode } = insertMoney(convertToAmount);

    if (!success) {
      const errorMessage = ERROR_MESSAGES[errorCode];
      return renderLogMessage(errorMessage);
    }

    renderBalanceDisplay(updatedBalance);
    renderLogMessage(`${formatter.format(amount)}원이 투입되었습니다.`);
    priceInput.value = '';
  };

  /** 상품 구매 기능 */
  const handleProductPurchase = (e) => {
    const button = e.target.closest('.product-button');
    if (!button) return;

    const productId = button.dataset.id;

    const { success, product, updatedBalance, errorCode } = buyProduct(productId);

    if (!success) {
      const errorMessage = ERROR_MESSAGES[errorCode];
      return renderLogMessage(errorMessage);
    }

    renderBalanceDisplay(updatedBalance);
    renderLogMessage(`${product.name}을(를) 구매하셨습니다.`);
  };

  /** 잔돈 반환 기능 */
  const handleMoneyReturn = () => {
    const { success, returnBalance, updatedBalance, errorCode } = returnMoney();

    if (!success) {
      const errorMessage = ERROR_MESSAGES[errorCode];
      return renderLogMessage(errorMessage);
    }

    renderLogMessage(`${formatter.format(returnBalance)}원이 반환되었습니다.`);

    renderBalanceDisplay(updatedBalance);
  };

  return {
    handleMoneyAmountInput,
    handleMoneyInsert,
    handleProductPurchase,
    handleMoneyReturn,
  };
};
