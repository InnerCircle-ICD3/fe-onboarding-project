export const MAX_AMOUNT = 1000000;
export const formatter = new Intl.NumberFormat();

export const ERROR_CODE = {
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  INVALID_AMOUNT: 'INVALID_AMOUNT',
  EXCEED_MAX_AMOUNT: 'EXCEED_MAX_AMOUNT',
  NO_BALANCE_TO_RETURN: 'NO_BALANCE_TO_RETURN',
};

export const ERROR_MESSAGES = {
  [ERROR_CODE.PRODUCT_NOT_FOUND]: '상품을 찾을 수 없습니다.',
  [ERROR_CODE.INSUFFICIENT_BALANCE]: '잔액이 부족합니다.',
  [ERROR_CODE.INVALID_AMOUNT]: '올바른 금액을 입력해주세요.',
  [ERROR_CODE.EXCEED_MAX_AMOUNT]: `최대 ${formatter.format(
    MAX_AMOUNT
  )}원까지만 투입 가능합니다.`,
  [ERROR_CODE.NO_BALANCE_TO_RETURN]: '반환할 잔액이 없습니다.',
};
