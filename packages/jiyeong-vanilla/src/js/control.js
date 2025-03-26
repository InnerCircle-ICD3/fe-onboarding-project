import { formatNumber, extractNumber } from "./utils";
import { store } from "./store";

export const handleInputCoin = () => {
  const inputCoin = document.querySelector(".insert-amount");

  inputCoin.addEventListener("input", (e) => {
    const numericValue = Math.max(0, extractNumber(e.target.value));
    e.target.value = formatNumber(numericValue);

    store.setState({
      ...store.getState(),
      insertAmount: numericValue,
    });
  });
};

export const handleInsertButton = () => {
  const insertButton = document.querySelector(".btn-insert");

  insertButton.addEventListener("click", () => {
    const currentState = store.getState();
    const insertAmount = currentState.insertAmount;

    if (insertAmount > 0) {
      store.setState({
        ...currentState,
        insertAmount: 0,
        balance: currentState.balance + insertAmount,
      });
    }
  });
};

export const handleReturnButton = () => {
  const returnButton = document.querySelector(".btn-return");

  returnButton.addEventListener("click", () => {
    store.setState({
      ...store.getState(),
      insertAmount: 0,
      balance: 0,
    });
  });
};
