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

    buttonElement.classList.add("button");

    nameElement.textContent = button.name;
    priceElement.textContent = button.price.toString();

    buttonElement.appendChild(nameElement);
    buttonElement.appendChild(priceElement);

    buttonWrapper.appendChild(buttonElement);
    buttonListElement.appendChild(buttonWrapper);
  }
};

export default addButtonList;
