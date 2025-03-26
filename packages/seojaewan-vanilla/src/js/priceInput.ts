import checkInstance from "./checkType";
import { numberWithComma } from "./commas";
import addLogging from "./logging";
import { totalPrice } from "./main";

const handlePriceInput = (e:SubmitEvent) => {
  e.preventDefault();

  const form = e.target;
  if(!checkInstance(form, HTMLFormElement)) return;

  const priceInputElement = form.elements.namedItem("price-input");
  if(!checkInstance(priceInputElement, HTMLInputElement)) return;

  const totalPriceElement = document.querySelector(
    ".total-price"
  );
  if(!checkInstance(totalPriceElement, HTMLParagraphElement)) return;

  const price = Number(priceInputElement.value);
  const updatePrice = totalPrice.updateTotalPrice(price);

  totalPriceElement.textContent = numberWithComma(updatePrice).toString();
  form.reset();
  priceInputElement.select();

  addLogging(`${numberWithComma(price)}원을 투입했습니다.`);
};

const handleFocusInput = (e: FocusEvent) => {
  const inputElement = e.target;

  if(checkInstance(inputElement, HTMLInputElement)) inputElement.select();
}

const addInputEvent = () => {
  const formElement = document.querySelector(
    ".input--wrapper"
  );
  const priceInputElement = document.querySelector(
    ".input");

  if(checkInstance(formElement, HTMLFormElement)) formElement.addEventListener("submit", handlePriceInput);
  if(checkInstance(priceInputElement, HTMLInputElement)) priceInputElement.addEventListener("focus", handleFocusInput);
};

export default addInputEvent;
