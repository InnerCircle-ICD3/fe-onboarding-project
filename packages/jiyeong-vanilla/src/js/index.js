import { handleInputCoin, handleInsertButton } from "./control";
import { store } from "./store";
import { formatNumber } from "./utils";

const renderUI = (state) => {
  const insertAmount = document.querySelector(".insert-amount");
  insertAmount.value = formatNumber(state.insertAmount || 0);

  const balanceDisplay = document.querySelector(".balance-display");
  balanceDisplay.textContent = formatNumber(state.balance || 0);
};

const initApp = () => {
  handleInputCoin();
  handleInsertButton();
  store.subscribe(renderUI);
  renderUI(store.getState());
};

document.addEventListener("DOMContentLoaded", initApp);
