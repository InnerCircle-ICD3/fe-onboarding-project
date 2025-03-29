import { createError } from './utils';
import { ERROR_CODE, MAX_AMOUNT } from './constants';

export const createVendingMachineService = (store) => {
  /** 상품 투입 */
  const insertMoney = (amount) => {
    if (!Number.isFinite(amount) || amount <= 0) {
      return createError(ERROR_CODE.INVALID_AMOUNT);
    }

    // 최대 금액 제한
    if (amount > MAX_AMOUNT) {
      return createError(ERROR_CODE.EXCEED_MAX_AMOUNT);
    }

    // 투입 금액 업데이트
    const updatedBalance = store.incrementBalance(amount);

    return {
      success: true,
      amount,
      updatedBalance,
    };
  };

  /** 상품 구매 */
  const buyProduct = (productId) => {
    const validationResult = validatePurchase(productId);

    if (!validationResult.success) {
      return validationResult;
    }

    const { product } = validationResult;

    // 잔액 감소 업데이트
    const updatedBalance = store.decrementBalance(product.price);

    return {
      success: true,
      product,
      updatedBalance,
    };
  };

  /** 잔돈 반환 */
  const returnMoney = () => {
    const currentBalance = store.getBalance();

    if (currentBalance === 0) {
      return createError(ERROR_CODE.NO_BALANCE_TO_RETURN);
    }

    // 잔액 초기화
    const updatedBalance = store.resetBalance();

    return {
      success: true,
      returnBalance: currentBalance,
      updatedBalance,
    };
  };

  /** 상품 구매 검증 */
  const validatePurchase = (productId) => {
    const product = store.getProductById(productId);

    // 상품이 존재하지 않는 경우
    if (!product) {
      const error = createError(ERROR_CODE.PRODUCT_NOT_FOUND);
      return {
        ...error,
        product,
      };
    }

    // 품절 상품인 경우
    if (product.disabled) {
      const error = createError(ERROR_CODE.PRODUCT_DISABLED);
      return {
        ...error,
        product,
      };
    }

    const currentBalance = store.getBalance();

    if (currentBalance < product.price) {
      const error = createError(ERROR_CODE.INSUFFICIENT_BALANCE);
      return {
        ...error,
        product,
      };
    }

    return {
      success: true,
      product,
      updatedBalance: currentBalance,
    };
  };

  return {
    buyProduct,
    insertMoney,
    returnMoney,
    validatePurchase,
  };
};
