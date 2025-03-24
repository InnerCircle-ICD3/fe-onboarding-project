import { handleInputCoin } from "./control";
import { store } from "./store";

const renderUI = (state) => {
  const inputCoin = document.querySelector(".input-coin");
  inputCoin.value = state.inputCoinAmount;
};

const initApp = () => {
  handleInputCoin();
  store.subscribe(renderUI);
  renderUI(store.getState());
};

document.addEventListener("DOMContentLoaded", initApp);
