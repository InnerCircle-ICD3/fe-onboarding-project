import { updateAmountDisplay, formatCurrencyAsLocaleString } from "./utils.js";
import { currentAmount, totalAmount, setCurrentAmount, setTotalAmount } from "./store.js";
import { addLog } from "./logs.js";

export const $form = document.getElementsByTagName("form")[0];
export const $userAmount = document.getElementById("user-amount");

/**
 * 투입 금액을 변경하는 함수
 * @param {Event} event
 */
export const handleChangeAmount = (event) => {
  let userAmount = event.target.value;
  if (isNaN(userAmount) || userAmount === "") {
    userAmount = 0;
  }

  setCurrentAmount(parseInt(userAmount));
};

/**
 * 투입 금액을 초기화하는 함수
 */
const resetAmount = () => {
  if ($form) {
    $form.reset();
  }
  setCurrentAmount(0);
};

/**
 * 투입 금액을 제출하는 함수
 * @param {Event} event
 */
export const handleSubmitInsertAmount = (event) => {
  event.preventDefault();
  const totalAmount = setTotalAmount();
  updateAmountDisplay(".vending-machine-total-amount", totalAmount);
  addLog(`금액 ${formatCurrencyAsLocaleString(totalAmount)}원이 투입되었습니다.`);
  if ($form) {
    $form.reset();
  }
};

/**
 * 투입 금액을 반환하는 함수
 */
export const handleReturnMoney = () => {
  setCurrentAmount(0);
  updateAmountDisplay(".vending-machine-total-amount", 0);
  addLog(`잔액 ${formatCurrencyAsLocaleString(totalAmount)}원이 반환되었습니다.`);
  setTotalAmount(0);
};

/**
 * 상품을 구매하는 함수
 * @param {Event} event
 */
export const handleBuy = (event) => {
  event.preventDefault();
  const $button = event.target.closest("button");
  const $drink = $button.querySelector(".drink-price");
  const $drinkName = $button.querySelector(".drink-name");
  const drinkPrice = parseInt($drink?.textContent?.replace(/[원,]/g, ""));
  const drinkName = $drinkName?.textContent || "음료";

  const remainingAmount = currentAmount - drinkPrice;

  if (remainingAmount < 0) {
    alert("금액이 부족합니다.");
    return;
  }

  setCurrentAmount(remainingAmount);
  setTotalAmount(totalAmount - drinkPrice);
  updateAmountDisplay(".vending-machine-total-amount", remainingAmount);
  addLog(
    `${drinkName}를 구매했습니다. (가격: ${formatCurrencyAsLocaleString(
      drinkPrice
    )}원, 잔액: ${formatCurrencyAsLocaleString(remainingAmount)}원)`
  );
};
