import { store } from "./store";
import { formatNumber, extractNumber } from "./utils";

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
