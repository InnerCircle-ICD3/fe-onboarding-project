
import checkInstance from "./checkType";
import { numberWithComma } from "./commas";
import { totalPrice } from "./main";

const handlePayment = (e: MouseEvent) => {
    const ul = document.querySelector(".button--list");
    if(!checkInstance(ul, HTMLUListElement) || !checkInstance(e.target, HTMLElement)) return;
    
    const button = e.target.closest('button.button--payment');
    if(!checkInstance(button, HTMLButtonElement) || !ul.contains(button)) return;

    const value = button.value;
    const currentValue = Number(value);

    const totalPriceElement = document.querySelector(".total-price") as HTMLDivElement;
    const totalPriceValue = totalPrice.getTotalPrice();

    let updatePrice;

    if(totalPriceValue < currentValue) {
        updatePrice = currentValue;
    } else {
        updatePrice = totalPrice.updateTotalPrice(-currentValue);
    }

    totalPriceElement.textContent = numberWithComma(updatePrice);
}

const addPaymentEvent = () => {
    const buttonList = document.querySelector(".button--list");

    if(checkInstance(buttonList, HTMLUListElement)) buttonList.addEventListener("click", handlePayment);
}

export default addPaymentEvent;