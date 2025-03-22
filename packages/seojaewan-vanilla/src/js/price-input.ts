import { numberWithComma } from "./commas";
import { totalPrice } from "./main";

const handlePriceInput = () => {
  const priceInputElement = document.querySelector(
    ".input"
  ) as HTMLInputElement;

  const totalPriceElement = document.querySelector(
    ".total-price"
  ) as HTMLDivElement;

  const price = Number(priceInputElement.value);

  const updatePrice = totalPrice.updateTotalPrice(price);

  totalPriceElement.textContent = numberWithComma(updatePrice).toString();
  priceInputElement.value = "0";
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    handlePriceInput();
  }
}

const handlePriceChange = (e: Event) => {
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

  addPriceElement.addEventListener("click", handlePriceInput);
  priceInputElement.addEventListener("keydown", handleKeyDown);

  priceInputElement.addEventListener("change", handlePriceChange);
};

export default addInputEvent;
