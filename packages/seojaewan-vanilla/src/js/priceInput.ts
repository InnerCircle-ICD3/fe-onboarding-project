import numberWithComma from "./numberWithComma";

const priceInput = () => {
  const priceInputElement = document.querySelector(
    ".input"
  ) as HTMLInputElement;

  const totalPriceElement = document.querySelector(
    ".total-price"
  ) as HTMLDivElement;

  totalPriceElement.textContent = numberWithComma(
    Number(priceInputElement.value)
  ).toString();
  priceInputElement.value = "0";
};

const changePriceInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;

  if (Number(value) < 0) {
    (e.target as HTMLInputElement).value = "0";
  }
};

const addInputEvent = () => {
  const addPriceElement = document.querySelector(
    ".add-price"
  ) as HTMLButtonElement;
  const priceInputElement = document.querySelector(
    ".input"
  ) as HTMLInputElement;

  addPriceElement.addEventListener("click", priceInput);
  priceInputElement.addEventListener("change", changePriceInput);
};

export default addInputEvent;
