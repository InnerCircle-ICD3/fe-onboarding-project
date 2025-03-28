import {updateAmountDisplay} from "./utils.js";

// #region 상수 정의
const DRINK_NAME = {
  COLA: "콜라",
  SPRITE: "속이 사이다",
  FANTA: "판타지판타",
  EOMUK: "오뎅국물",
  LATTE: "부장라떼",
  WATER: "오아시스",
  RED_BULL: "레드뿔",
  HOT_SEVEN: "핫세븐",
  COFFEE_MILK: "커피우유",
  AMERICANO: "아메리카노",
  SKY_BORI: "하늘보리",
};
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
// #endregion 상수 정의

// #region 재고 관리
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
// #endregion 상태 관리

// #region 상품 표시 화면 기능
/**
 *
 * @param {string} text
 * @param {string} className
 * @param {string | null} drinkName
 * @returns {HTMLSpanElement}
 */
const createSpan = (text, className, drinkName = null) => {
  const $span = document.createElement("span");
  $span.classList.add(className);
  if (drinkName) $span.dataset.drinkName = drinkName;
  $span.textContent = text;
  return $span;
};

const drinkListElement = () => {
  const $drinkList = document.getElementById("drink-list");
  const $fragment = document.createDocumentFragment();

  Object.entries(DRINK_PRICES).forEach(([drink_name, drink_price]) => {
    const $li = document.createElement("li");
    const $button = document.createElement("button");
    $button.type = "button";

    $button.appendChild(createSpan(DRINK_NAME[drink_name], "drink-name"));
    $button.appendChild(createSpan(drink_price, "drink-price", drink_name));

    $li.appendChild($button);
    $fragment.appendChild($li);
  });

  $drinkList.appendChild($fragment);
};
// #endregion 상품 표시 화면 기능

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
  // 자판기 상품 표시
  drinkListElement();

  // 금액 표시
  convertVendingMachineTotalAmount();
  convertDrinkPrice();
  convertUserAmount();
});
