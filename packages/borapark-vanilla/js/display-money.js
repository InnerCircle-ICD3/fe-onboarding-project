import { updateAmountDisplay } from "./utils.js";
import { DRINK_PRICES } from "./constant.js";
import { totalAmount } from "./store.js";

/**
 * 금액 표시 화면 금액 변환
 * @returns {void}
 */
export const convertVendingMachineTotalAmount = () => {
  updateAmountDisplay(".vending-machine-total-amount", totalAmount);
};

/**
 * 자판기 표시 금액 변환
 * @returns {void}
 */
export const convertDrinkPrice = () => {
  Object.entries(DRINK_PRICES).forEach(([drink_name, drink_price]) => {
    updateAmountDisplay(`.drink-price[data-drink-name="${drink_name}"]`, drink_price, true);
  });
};

/**
 * 투입 금액 입력창 금액
 * @returns {number}
 */
export const getUserAmount = () => {
  return document.getElementById("user-amount").value;
};

/**
 * 투입 금액 입력창 금액 변환
 * @returns {void}
 */
export const convertUserAmount = () => {
  const userAmount = getUserAmount();
  updateAmountDisplay("#user-amount", userAmount);
};
