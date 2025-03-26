import { PRODUCTS } from "./constants";
import { formatNumber } from "./utils";
import { store } from "./store";

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
