import db from "./db.json";

const productBtns = db.products.map((product) => {
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.innerHTML = `${product.name}<br/>${product.price.toLocaleString()}`;
  button.classList.add("btn-product");
  li.append(button);
  return li;
});

const productList = document.getElementById("product-list") as HTMLUListElement;

productList.append(...productBtns);
