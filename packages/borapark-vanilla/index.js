import "./js/insert-money.js";
import { updateAmountDisplay } from "./js/utils.js";

// 상수 정의
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

/**
 * 자판기 초기 view 설정
 * @returns {void}
 */
const initVendingMachineView = () => {
  // 자판기 상품 표시
  drinkListElement();

  // 자판기 금액 표시
  convertVendingMachineTotalAmount();
  convertDrinkPrice();
  convertUserAmount();
};

initVendingMachineView();
