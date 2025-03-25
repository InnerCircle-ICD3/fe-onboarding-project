import { handleInputCoin, handleInsertButton } from "./control";
import { store } from "./store";

const renderUI = (state) => {
  const insertAmount = document.querySelector(".insert-amount");
  insertAmount.value = state.insertAmount;

  const balanceDisplay = document.querySelector(".balance-display");
  balanceDisplay.textContent = state.balance;
};

const initApp = () => {
  handleInputCoin();
  handleInsertButton();
  store.subscribe(renderUI);
  renderUI(store.getState());
};

document.addEventListener("DOMContentLoaded", initApp);
