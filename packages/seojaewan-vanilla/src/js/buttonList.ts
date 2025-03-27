import { productList } from "../assets/info.json";
import checkInstance from "./checkType";

const addButtonList = () => {
  const buttonListElement = document.querySelector(
    ".button--list"
  );
  const templateElement = document.querySelector("#button--template");

  if(!checkInstance(buttonListElement, HTMLUListElement) || !checkInstance(templateElement, HTMLTemplateElement)) return;
  
  for (const {name, price} of productList) {
    const clone = document.importNode(templateElement.content, true); 

    const nameElement = clone.querySelector(".name");
    const priceElement = clone.querySelector(".price");
    const buttonElement = clone.querySelector(".button--payment");

    if(!checkInstance(nameElement, HTMLSpanElement) || !checkInstance(priceElement, HTMLSpanElement) || !checkInstance(buttonElement, HTMLButtonElement)) return;
    
    nameElement.textContent = name;
    priceElement.textContent = price.toString();
    buttonElement.value = price.toString();
    buttonElement.name = name;

    buttonListElement.appendChild(clone);
  }
};

export default addButtonList;
