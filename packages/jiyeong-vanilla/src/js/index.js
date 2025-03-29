import {
  handleInputCoin,
  handleInsertButton,
  handleReturnButton,
} from "./control";
import { renderUI, renderProducts } from "./render";
import { store } from "./store";
import { handlePressProductButton } from "./vendingMachine";

const initApp = () => {
  renderProducts();
  handleInputCoin();
  handleInsertButton();
  handleReturnButton();
  handlePressProductButton();
  store.subscribe(renderUI);
  renderUI(store.getState());
};

document.addEventListener("DOMContentLoaded", initApp);
