import {
  handleInputCoin,
  handleInsertButton,
  handleReturnButton,
  handlePressProductButton,
} from "./control";
import { renderUI, renderProducts } from "./render";
import { store } from "./store";

const initApp = () => {
  renderProducts();
  handleInputCoin();
  handleInsertButton();
  handlePressProductButton();
  handleReturnButton();
  store.subscribe(renderUI);
  renderUI(store.getState());
};

document.addEventListener("DOMContentLoaded", initApp);
