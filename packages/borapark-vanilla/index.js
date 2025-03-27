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
let currentAmount;
let drinkInventory = {
  COLA: 10000,
  SPRITE: 10000,
  FANTA: 10000,
  EOMUK: 10000,
  LATTE: 10000,
  WATER: 10000,
  RED_BULL: 10000,
  HOT_SEVEN: 10000,
  COFFEE_MILK: 10000,
  AMERICANO: 2000,
  SKY_BORI: 10000,
};

// #region 금액 표시 화면 기능
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
  return document.getElementById("user-amount").value;
};

// 투입 금액 입력창 금액 변환
const convertUserAmount = () => {
  const userAmount = getUserAmount();
  updateAmountDisplay("#user-amount", userAmount);
};
// #endregion 금액 표시 화면 기능

// 이벤트 리스너 등록
document.addEventListener("DOMContentLoaded", () => {
  convertVendingMachineTotalAmount();
  convertDrinkPrice();
  convertUserAmount();
});

// #region 투입 기능
const handleChangeAmount = (event) => {
  // 입력창에 focus 했을 때 값 초기화
  if(event.target.focus) {
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

  // 투입 금액 입력 이벤트 리스너
document.getElementById("user-amount").addEventListener("change", handleChangeAmount);

// 투입 금액 입력 버튼 클릭 이벤트 리스너
const insertButton = document.querySelector(".vending-machine-button-fieldset > button:nth-child(1)");
insertButton.addEventListener("click", handleClickInsertAmountButton);