import { PRODUCTS } from "./constants";
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
        logs: [
          ...currentState.logs,
          `💰 ${formatNumber(insertAmount)}원을 투입했습니다.`,
        ],
      });
    }
  });
};

export const handleReturnButton = () => {
  const returnButton = document.querySelector(".btn-return");

  returnButton.addEventListener("click", () => {
    const currentState = store.getState();

    if (currentState.balance > 0) {
      store.setState({
        ...currentState,
        insertAmount: 0,
        balance: 0,
        logs: [
          ...currentState.logs,
          `🙇‍♀️ ${formatNumber(currentState.balance)}원을 반환합니다.`,
        ],
      });
    }
  });
};

export const handlePressProductButton = () => {
  const productButtons = document.querySelectorAll(".product-btn");
  const balanceDisplay = document.querySelector(".balance-display");

  productButtons.forEach((button) => {
    const productId = parseInt(button.dataset.productId) - 1;
    const product = PRODUCTS[productId];
    let originalBalance;

    button.addEventListener("mousedown", () => {
      const currentState = store.getState();
      // 잔액이 부족한 경우 상품 가격 표시
      if (currentState.balance < product.price) {
        originalBalance = currentState.balance; // 원래 잔액 저장
        balanceDisplay.textContent = formatNumber(product.price);
      } else {
        store.setState({
          ...currentState,
          balance: currentState.balance - product.price,
          logs: [...currentState.logs, `🧃 ${product.name}을 구매했습니다.`],
        });
      }
    });

    button.addEventListener("mouseup", () => {
      // 원래 잔액으로 복원
      if (originalBalance !== undefined) {
        balanceDisplay.textContent = formatNumber(originalBalance);
        originalBalance = undefined;
      }
    });
  });
};
