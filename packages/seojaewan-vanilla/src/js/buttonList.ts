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

    if(!checkInstance(nameElement, HTMLSpanElement) || !checkInstance(priceElement, HTMLSpanElement)) return;
    
    nameElement.textContent = name;
    priceElement.textContent = price.toString();

    buttonListElement.appendChild(clone);
  }
};

export default addButtonList;
