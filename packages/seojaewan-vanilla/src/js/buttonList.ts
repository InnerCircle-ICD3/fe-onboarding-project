import { productList } from "../assets/info.json";

const addButtonList = () => {
  const buttonListElement = document.querySelector(
    ".button--list"
  ) as HTMLUListElement;
  const templateElement = document.querySelector("#button--template") as HTMLTemplateElement;

  
  for (const {name, price} of productList) {
    const clone = document.importNode(templateElement.content, true); 

    const nameElement = clone.querySelector(".name") as HTMLSpanElement;
    const priceElement = clone.querySelector(".price") as HTMLSpanElement;

    nameElement.textContent = name;
    priceElement.textContent = price.toString();

    buttonListElement.appendChild(clone);
  }
};

export default addButtonList;
