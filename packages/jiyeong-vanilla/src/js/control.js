import { PRODUCTS } from "./constants";
import { formatNumber, extractNumber } from "./utils";
import { store } from "./store";

export const handleInputCoin = () => {
  const inputCoin = document.querySelector(".insert-amount");

  inputCoin.addEventListener("input", (e) => {
    const numericValue = Math.max(0, extractNumber(e.target.value));
    e.target.value = formatNumber(numericValue);

    store.setState({
      insertAmount: numericValue,
    });
  });
};

export const handleInsertButton = () => {
  const insertButton = document.querySelector(".btn-insert");

  insertButton.addEventListener("click", () => {
    const { insertAmount, balance, logs } = store.getState();

    if (insertAmount > 0) {
      store.setState({
        insertAmount: 0,
        balance: balance + insertAmount,
        logs: [...logs, `💰 ${formatNumber(insertAmount)}원을 투입했습니다.`],
      });
    }
  });
};

export const handleReturnButton = () => {
  const returnButton = document.querySelector(".btn-return");

  returnButton.addEventListener("click", () => {
    const { balance, logs } = store.getState();

    if (balance > 0) {
      store.setState({
        insertAmount: 0,
        balance: 0,
        logs: [...logs, `🙇‍♀️ ${formatNumber(balance)}원을 반환합니다.`],
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
      const { balance, logs } = store.getState();
      // 잔액이 부족한 경우 상품 가격 표시
      if (balance < product.price) {
        originalBalance = balance; // 원래 잔액 저장
        balanceDisplay.textContent = formatNumber(product.price);
      } else {
        store.setState({
          balance: balance - product.price,
          logs: [...logs, `🧃 ${product.name}을 구매했습니다.`],
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
