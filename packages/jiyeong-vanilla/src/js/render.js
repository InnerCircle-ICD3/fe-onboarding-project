import { formatNumber } from "./utils";
import { PRODUCTS } from "./constants";

const createProductButton = (product) => {
  const button = document.createElement("button");
  button.className = "product-btn";
  button.dataset.productId = product.id;

  const nameText = document.createTextNode(product.name);
  button.appendChild(nameText);

  const priceSpan = document.createElement("span");
  priceSpan.textContent = `${formatNumber(product.price)}원`;
  button.appendChild(priceSpan);

  return button;
};

export const renderProducts = () => {
  const productsGrid = document.querySelector(".products-grid");

  PRODUCTS.forEach((product) => {
    const productButton = createProductButton(product);
    productsGrid.appendChild(productButton);
  });
};

export const renderUI = (state) => {
  const insertAmount = document.querySelector(".insert-amount");
  insertAmount.value = formatNumber(state.insertAmount || 0);

  const balanceDisplay = document.querySelector(".balance-display");
  balanceDisplay.textContent = formatNumber(state.balance || 0);
};
