import { PRODUCTS } from "./constants";
import { formatNumber } from "./utils";
import { store } from "./store";

export const handlePressProductButton = () => {
  const productContainer = document.querySelector(".products-grid");
  const balanceDisplay = document.querySelector(".balance-display");
  let originalBalance;

  productContainer.addEventListener("mousedown", (e) => {
    const button = e.target.closest(".product-btn");
    if (!button) return;

    const productId = parseInt(button.dataset.productId);
    const product = PRODUCTS.find(({ id }) => id === productId);

    if (!product) {
      console.error(`Error: 상품이 없습니다`);
      return;
    }

    const { balance } = store.getState();
    // 잔액이 부족한 경우 상품 가격 표시
    if (balance < product.price) {
      originalBalance = balance; // 원래 잔액 저장
      balanceDisplay.textContent = formatNumber(product.price);
    } else {
      store.setState({
        balance: balance - product.price,
      });
    }
  });

  productContainer.addEventListener("mouseup", (e) => {
    const button = e.target.closest(".product-btn");
    if (!button) return;

    // 원래 잔액으로 복원
    if (originalBalance !== undefined) {
      balanceDisplay.textContent = formatNumber(originalBalance);
      originalBalance = undefined;
    }
  });
};
