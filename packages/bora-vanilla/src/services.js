import { ERROR_CODE, MAX_AMOUNT } from './constants';
import products from './db/productsData';
import {
  decrementBalance,
  getBalance,
  incrementBalance,
  resetBalance,
} from './store';
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
  incrementBalance(amount);

  return {
    success: true,
    amount,
    updateBalance: getBalance(),
  };
};

/** 상품 구매 */
const buyProduct = (productId) => {
  const product = products.find(
    (product) => product.id === Number(productId)
  );

  if (!product) {
    return createError(ERROR_CODE.PRODUCT_NOT_FOUND);
  }

  const currentBalance = getBalance();

  if (currentBalance < product.price) {
    return createError(ERROR_CODE.INSUFFICIENT_BALANCE);
  }

  // 잔액 감소 업데이트
  decrementBalance(product.price);

  return {
    success: true,
    product,
    updatedBalance: getBalance(),
  };
};

/** 잔돈 반환 */
const returnMoney = () => {
  const currentBalance = getBalance();

  if (currentBalance === 0) {
    return createError(ERROR_CODE.NO_BALANCE_TO_RETURN);
  }

  resetBalance();

  return {
    success: true,
    returnBalance: currentBalance,
    updateBalance: getBalance(),
  };
};

export { buyProduct, insertMoney, returnMoney };
