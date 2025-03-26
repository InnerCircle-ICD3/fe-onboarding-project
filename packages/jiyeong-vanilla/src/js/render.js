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

const renderLogs = (logs) => {
  const logsContainer = document.querySelector(".transaction-history");
  const fragment = document.createDocumentFragment();

  // 새로운 로그만 추가
  const currentLogCount = logsContainer.children.length;
  const newLogs = logs.slice(currentLogCount);

  newLogs.forEach((log) => {
    const li = document.createElement("li");
    li.textContent = log;
    fragment.appendChild(li);
  });

  // fragment를 한 번에 추가
  if (fragment.children.length > 0) {
    logsContainer.appendChild(fragment);
    // 최신 로그로 스크롤
    logsContainer.scrollTop = logsContainer.scrollHeight;
  }
};

export const renderUI = (state) => {
  const insertAmount = document.querySelector(".insert-amount");
  insertAmount.value = formatNumber(state.insertAmount || 0);

  const balanceDisplay = document.querySelector(".balance-display");
  balanceDisplay.textContent = formatNumber(state.balance || 0);

  renderLogs(state.logs);
};
