import { DRINK_NAME, DRINK_PRICES } from "./js/constant.js";
import { convertDrinkPrice, convertUserAmount, convertVendingMachineTotalAmount } from "./js/display-money.js";
import {
  $form,
  $userAmount,
  handleChangeAmount,
  handleSubmitInsertAmount,
  handleReturnMoney,
  handleBuy,
} from "./js/transactions.js";
/**
 * 자판기 상품 상세 정보 표시
 * @param {string | number} text
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

/**
 * 자판기 상품 목록
 * @property {string} drink_name - 음료수 이름
 * @property {number} drink_price - 음료수 가격
 * @returns {void}
 */
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

/**
 * 투입 기능
 */
const insertMoney = () => {
  // 투입 금액 입력 이벤트 리스너
  $userAmount.addEventListener("change", handleChangeAmount);
  // 투입 금액 입력 폼 제출 이벤트 리스너
  $form.addEventListener("submit", handleSubmitInsertAmount);
};
insertMoney();

/**
 * 반환 기능
 */
const returnMoney = () => {
  const $returnButton = $form.querySelector("button[type='button']");
  $returnButton.addEventListener("click", handleReturnMoney);
};
returnMoney();

/**
 * 구매 기능
 */
const buy = () => {
  const $drinkList = document.getElementById("drink-list");
  const $drinkItem = $drinkList.querySelectorAll("button");
  $drinkItem.forEach((item) => {
    item.addEventListener("click", handleBuy);
  });
};

buy();
