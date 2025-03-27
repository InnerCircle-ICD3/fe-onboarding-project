import {updateAmountDisplay} from "./utils.js";

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
  AMERICANO: 2000,
  SKY_BORI: 1500,
};

// 상태 관리
let totalAmount = 0;
let currentAmount = 0;

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

// #region 금액 표시 화면 기능
/**
 * 금액 표시 화면 금액 변환
 * @returns {void}
 */
const convertVendingMachineTotalAmount = () => {
  updateAmountDisplay(".vending-machine-total-amount", totalAmount);
};

/**
 * 자판기 표시 금액 변환
 * @returns {void}
 */
const convertDrinkPrice = () => {
  Object.entries(DRINK_PRICES).forEach(([drink_name, drink_price]) => {
    updateAmountDisplay(`.drink-price[data-drink-name="${drink_name}"]`, drink_price, true);
  });
};

/**
 * 투입 금액 입력창 금액
 * @returns {number}
 */
const getUserAmount = () => {
  return document.getElementById("user-amount").value;
};

/**
 * 투입 금액 입력창 금액 변환
 * @returns {void}
 */
const convertUserAmount = () => {
  const userAmount = getUserAmount();
  updateAmountDisplay("#user-amount", userAmount);
};
// #endregion 금액 표시 화면 기능

// #region 투입 기능
const handleChangeAmount = (event) => {
  // 입력창에 focus 했을 때 값 초기화
  if (event.target.focus) {
    event.target.value = "";
  }
  const userAmount = getUserAmount();
  currentAmount = Number(userAmount);
  console.log(currentAmount);
};

const handleClickInsertAmountButton = () => {
  totalAmount += currentAmount;
  console.log(totalAmount, "total");
  updateAmountDisplay(".vending-machine-total-amount", totalAmount);
  currentAmount = 0; // 초기화
};
// #endregion 투입 기능

/**
 * 자판기 초기 view 설정
 * @returns {void}
 */
const initVendingMachineView = () => {
  convertVendingMachineTotalAmount();
  convertDrinkPrice();
  convertUserAmount();
};

initVendingMachineView();
