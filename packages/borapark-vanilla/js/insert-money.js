import { updateAmountDisplay } from "./utils.js";
import { setCurrentAmount, setTotalAmount } from "./store.js";

export const $form = document.getElementsByTagName("form")[0];
export const $userAmount = document.getElementById("user-amount");

export const handleChangeAmount = (event) => {
  let userAmount = event.target.value;
  if (isNaN(userAmount) || userAmount === "") {
    userAmount = 0;
  }

  setCurrentAmount(parseInt(userAmount));
};

const resetAmount = () => {
  $form.reset();
};

export const handleSubmitInsertAmount = (event) => {
  event.preventDefault();
  const totalAmount = setTotalAmount();
  updateAmountDisplay(".vending-machine-total-amount", totalAmount);
  resetAmount();
};
