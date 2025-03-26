import { ERROR_CODE } from './constants';
import products from './db/productsData';
import { decrementBalance, getBalance } from './store';
import { createError } from './utils';

/** 상품 투입 */
const insertMoney = () => {};

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
const returnMoney = () => {};

export { buyProduct };
