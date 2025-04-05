const NOT_ENOUGH_MONEY_ERROR_MESSAGE = "잔액이 부족합니다.";
const NOT_ENOUGH_MONEY_ERROR = "NotEnoughtMoneyError";

export class NotEnoughtMoneyError extends Error {
  constructor() {
    super(NOT_ENOUGH_MONEY_ERROR_MESSAGE);
    this.name = NOT_ENOUGH_MONEY_ERROR;
  }
}
