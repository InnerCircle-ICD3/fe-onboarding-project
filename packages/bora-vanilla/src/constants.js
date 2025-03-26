export const MAX_AMOUNT = 1000000;
export const formatter = new Intl.NumberFormat();

export const ERROR_CODE = {
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
};

export const ERROR_MESSAGES = {
  [ERROR_CODE.PRODUCT_NOT_FOUND]: '상품을 찾을 수 없습니다.',
  [ERROR_CODE.INSUFFICIENT_BALANCE]: '잔액이 부족합니다.',
};
