import db from "../db.json";
import { NotEnoughtMoneyError } from "../erros/NotEnoughtMoney.error";
import { Product } from "../model/product";
import { formatNumberWithCommas } from "../utills/format";
import { decrease, getAmount } from "./amount";
import { addLog } from "./print-logs";

const $productList = document.querySelector<HTMLUListElement>("#product-list");

const COLUMN_COUNT = 3;
const ROW_COUNT = Math.ceil(db.products.length / 3);

function renderProductList() {
  // db.products.forEach((product) => {
  //   // const li = document.createElement("li");
  //   // const button = document.createElement("button");
  //   // button.innerHTML = `${product.name}<br/>${formatNumberWithCommas(
  //   //   product.price
  //   // )}`;
  //   // button.classList.add("btn-product", "btn-color");
  //   // button.dataset.productId = product.id.toString();
  //   // li.append(button);
  //   // $productList?.append(li);
  //   renderBtnProduct(product);
  // });
  // const emptyCount = 3 - (db.products.length % 3);

  for (let i = 0; i < COLUMN_COUNT * ROW_COUNT; i++) {
    const product = db.products[i];
    renderBtnProduct(product);
  }
}

function renderBtnProduct(product?: Product) {
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.classList.add("btn-product", "btn-color");
  if (product) {
    button.dataset.productId = product?.id.toString() ?? "";
    button.innerHTML = `${product.name}<br/>${formatNumberWithCommas(
      product.price
    )}`;
  }
  button.disabled = !product;
  li.append(button);
  $productList?.append(li);
}

$productList?.addEventListener("mousedown", (e) => {
  if (!(e.target instanceof HTMLElement)) {
    return;
  }
  const button = e.target.closest<HTMLButtonElement>("button");
  const productId = Number(button?.dataset.productId);

  if (!productId) {
    return;
  }
  const product = db.products.find((product) => product.id === productId);
  if (!product) {
    return;
  }

  try {
    decrease(product.price);
    addLog("info", `${product.name}를 구매했습니다.`);
  } catch (error) {
    if (error instanceof NotEnoughtMoneyError) {
      const $insertedAmount =
        document.querySelector<HTMLInputElement>("#inserted-amount");
      if ($insertedAmount) {
        $insertedAmount.value = formatNumberWithCommas(product.price);
        addLog("error", "잔액이 부족합니다.");
      }
    }
  }
});

$productList?.addEventListener("mouseup", () => {
  const $insertedAmount =
    document.querySelector<HTMLInputElement>("#inserted-amount");
  if ($insertedAmount) {
    $insertedAmount.value = formatNumberWithCommas(getAmount());
  }
});

renderProductList();
