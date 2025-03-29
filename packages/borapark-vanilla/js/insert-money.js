import {updateAmountDisplay, sleep} from "./utils.js";

const $form = document.getElementsByTagName("form")[0];
const $userAmount = document.getElementById("user-amount");

const handleChangeAmount = (event) => {
  const userAmount = event.target.value;
  setCurrentAmount(parseInt(userAmount));
};

const resetAmount = () => {
  setCurrentAmount(0);
  updateAmountDisplay("#user-amount", currentAmount);
  console.log(currentAmount, "<<<<?")
};

const handleSubmitInsertAmount = (event) => {
  event.preventDefault();
  setTotalAmount();
  updateAmountDisplay(".vending-machine-total-amount", totalAmount);
  resetAmount();
};

// 투입 금액 입력 이벤트 리스너
$userAmount.addEventListener("change", handleChangeAmount);

// 투입 금액 입력 폼
$form.addEventListener("submit", handleSubmitInsertAmount);
