import {formatCurrencyAsLocaleString} from "./utils.js";

// 상수 정의
const DRINK_PRICES = {
  COLA: 1500,
  SPRITE: 1700,
  FANTA: 1500,
  EOMUK: 1800,
  LATTE: 800,
  WATER: 1000,
  RED_BULL: 2000,
  HOT_SEVEN: 1900,
  COFFEE_MILK: 1400,
};

// 상태 관리
let totalAmount = 0;
let currentAmount = 0;
let drinkInventory = {
  COLA: 10,
  SPRITE: 10,
  FANTA: 10,
  EOMUK: 10,
  LATTE: 10,
  WATER: 10,
  RED_BULL: 10,
  HOT_SEVEN: 10,
  COFFEE_MILK: 10,
};

/**
 * 금액 표시 화면 기능
 * @param {string} selector
 * @param {number} amount
 * @param {boolean} [needUnit]
 */
const updateAmountDisplay = (selector, amount, needUnit = false) => {
  const unit = "원";
  const amountElement = document.querySelector(selector);
  amountElement.textContent = `${formatCurrencyAsLocaleString(amount)}${needUnit ? unit : ""}`;
};

// 금액 표시 화면 금액 변환
const convertVendingMachineTotalAmount = () => {
  updateAmountDisplay(".vending-machine-total-amount", totalAmount);
};

// 자판기 표시 금액 변환
const convertDrinkPrice = () => {
  Object.keys(DRINK_PRICES).forEach((key) => {
    updateAmountDisplay(`.drink-price[data-drink-name="${key}"]`, DRINK_PRICES[key], true);
  });
};

// 투입 금액 입력창 금액
const getUserAmount = () => {
  const userAmount = document.querySelector("#user-amount").value;
  return userAmount;
};

// 투입 금액 입력창 금액 변환
const convertUserAmount = () => {
  const userAmount = getUserAmount();
  updateAmountDisplay("#user-amount", userAmount);
};


convertVendingMachineTotalAmount();
convertDrinkPrice();
convertUserAmount();

