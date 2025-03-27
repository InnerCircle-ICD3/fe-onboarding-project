import { decrease, increase } from "./amount";
import db from "./db.json";
import "./input-amount";
import { formatNumberWithCommas } from "./utills/format";

const productBtns = db.products.map((product) => {
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.innerHTML = `${product.name}<br/>${formatNumberWithCommas(
    product.price
  )}`;
  button.classList.add("btn-product");
  li.append(button);
  return li;
});

const productList = document.getElementById("product-list") as HTMLUListElement;

productList.append(...productBtns);
