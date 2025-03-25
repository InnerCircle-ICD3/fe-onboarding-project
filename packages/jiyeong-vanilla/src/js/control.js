import { store } from "./store";

export const handleInputCoin = () => {
  const inputCoin = document.querySelector(".insert-amount");
  inputCoin.addEventListener("input", (e) =>
    store.setState({ ...store.getState(), insertAmount: e.target.value })
  );
};

export const handleInsertButton = () => {
  const insertButton = document.querySelector(".btn-insert");
  insertButton.addEventListener("click", () =>
    store.setState({
      ...store.getState(),
      insertAmount: 0,
      balance: store.getState().balance + store.getState().insertAmount,
    })
  );
};
