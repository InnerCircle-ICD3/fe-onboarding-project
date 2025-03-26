
import checkInstance from "./checkType";
import { numberWithComma } from "./commas";
import addLogging from "./logging";
import { totalPrice } from "./main";

const handlePayment = (e: MouseEvent) => {
    const ul = document.querySelector(".button--list");
    if(!checkInstance(ul, HTMLUListElement) || !checkInstance(e.target, HTMLElement)) return;
    
    const button = e.target.closest('button.button--payment');
    if(!checkInstance(button, HTMLButtonElement) || !ul.contains(button)) return;

    const value = button.value;
    const name = button.name;
    const currentValue = Number(value);

    const totalPriceElement = document.querySelector(".total-price");
    if(!checkInstance(totalPriceElement, HTMLParagraphElement)) return;

    const totalPriceValue = totalPrice.getTotalPrice();

    let updatePrice;

    if(totalPriceValue < currentValue) {
        updatePrice = currentValue;
        addLogging(`잔액이 부족합니다. 현재 금액: ${numberWithComma(totalPriceValue)}원`);
    } else {
        updatePrice = totalPrice.updateTotalPrice(-currentValue);
        addLogging(`${name} 구매로 ${numberWithComma(currentValue)}원을 사용`);
    }

    totalPriceElement.textContent = numberWithComma(updatePrice);
}

const addPaymentEvent = () => {
    const buttonList = document.querySelector(".button--list");

    if(checkInstance(buttonList, HTMLUListElement)) buttonList.addEventListener("click", handlePayment);
}

export default addPaymentEvent;