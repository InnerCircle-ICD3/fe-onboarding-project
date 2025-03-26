import { ERROR_CODE, MAX_AMOUNT } from './constants';
import { store } from './store';
import { createError } from './utils';

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
  const product = store.getProductById(productId);

  // 상품 존재 여부 확인
  if (!product) {
    return createError(ERROR_CODE.PRODUCT_NOT_FOUND);
  }

  const currentBalance = store.getBalance();

  // 잔액 부족
  if (currentBalance < product.price) {
    return createError(ERROR_CODE.INSUFFICIENT_BALANCE);
  }

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

export { buyProduct, insertMoney, returnMoney };
