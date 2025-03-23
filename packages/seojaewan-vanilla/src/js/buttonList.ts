import { buttonList } from "../assets/info.json";

const addButtonList = () => {
  const buttonListElement = document.querySelector(
    ".button--list"
  ) as HTMLUListElement;

  for (const button of buttonList) {
    const buttonWrapper = document.createElement("li");
    const buttonElement = document.createElement("button");
    const nameElement = document.createElement("span");
    const priceElement = document.createElement("span");

    buttonElement.classList.add("button", "button--payment");
    buttonElement.value = button.price.toString();
    buttonElement.name = button.name;


    nameElement.textContent = button.name;
    priceElement.textContent = button.price.toString();

    buttonElement.appendChild(nameElement);
    buttonElement.appendChild(priceElement);

    buttonWrapper.classList.add("size--third");

    buttonWrapper.appendChild(buttonElement);
    buttonListElement.appendChild(buttonWrapper);
  }
};

export default addButtonList;
