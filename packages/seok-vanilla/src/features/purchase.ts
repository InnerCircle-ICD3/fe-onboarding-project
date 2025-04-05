import db from "../db.json";
import { NotEnoughtMoneyError } from "../erros/NotEnoughtMoney.error";
import { formatNumberWithCommas } from "../utills/format";
import { decrease, getAmount } from "./amount";

const $productList = document.querySelector<HTMLUListElement>("#product-list");

function renderProductList() {
  db.products.map((product) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerHTML = `${product.name}<br/>${formatNumberWithCommas(
      product.price
    )}`;
    button.classList.add("btn-product");
    button.dataset.productId = product.id.toString();
    li.append(button);
    $productList?.append(li);
  });
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
  } catch (error) {
    if (error instanceof NotEnoughtMoneyError) {
      const $insertedAmount =
        document.querySelector<HTMLInputElement>("#inserted-amount");
      if ($insertedAmount) {
        $insertedAmount.value = formatNumberWithCommas(product.price);
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
