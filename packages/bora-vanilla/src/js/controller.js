import { ERROR_MESSAGES } from './constants';
import { formatDigitsWithCommas, formatter, parseNumberWithCommas } from './utils';

export const createVendingMachineController = (service, view, store) => {
  /** 금액 입력시 콤마 추가 */
  const handleMoneyAmountInput = (value) => {
    return value ? formatDigitsWithCommas(value) : '';
  };

  /** 금액 투입 기능 */
  const handleMoneyInsert = (value) => {
    const convertToAmount = parseNumberWithCommas(value);

    const { success, amount, updatedBalance, errorCode } = service.insertMoney(convertToAmount);

    if (!success) {
      const errorMessage = ERROR_MESSAGES[errorCode];
      return view.renderLogMessage(errorMessage);
    }

    view.renderBalanceDisplay(updatedBalance);
    view.renderLogMessage(`${formatter.format(amount)}원이 투입되었습니다.`);
    view.clearMoneyInput();
  };

  /** 상품 구매 기능 */
  const handleProductPurchase = (productId) => {
    const { success, product, updatedBalance, errorCode } = service.buyProduct(productId);

    if (!success) {
      const errorMessage = ERROR_MESSAGES[errorCode];
      return view.renderLogMessage(errorMessage);
    }

    view.renderBalanceDisplay(updatedBalance);
    view.renderLogMessage(`${product.name}을(를) 구매하셨습니다.`);
  };

  /** 잔돈 반환 기능 */
  const handleMoneyReturn = () => {
    const { success, returnBalance, updatedBalance, errorCode } = service.returnMoney();

    if (!success) {
      const errorMessage = ERROR_MESSAGES[errorCode];
      return view.renderLogMessage(errorMessage);
    }

    view.renderLogMessage(`${formatter.format(returnBalance)}원이 반환되었습니다.`);
    view.renderBalanceDisplay(updatedBalance);
  };

  /** 상품 구매 검증 */
  const handlePurchaseValidate = (productId) => {
    const { success, productPrice, updatedBalance } = service.validatePurchase(productId);

    if (!success) {
      return view.renderBalanceDisplay(productPrice);
    }

    view.renderBalanceDisplay(updatedBalance);
  };

  const handlePurchaseValidateEnd = () => {
    const currentBalance = store.getBalance();
    view.renderBalanceDisplay(currentBalance);
  };

  return {
    handleMoneyAmountInput,
    handleMoneyInsert,
    handleProductPurchase,
    handleMoneyReturn,
    handlePurchaseValidate,
    handlePurchaseValidateEnd,
  };
};
