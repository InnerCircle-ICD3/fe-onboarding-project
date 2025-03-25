
import { numberWithComma } from "./commas";
import { totalPrice } from "./main";

const handlePayment = (value: string) => {
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
    const buttonList = document.querySelectorAll(".button--payment");

    buttonList.forEach((button) => {
        const value = (button as HTMLButtonElement).querySelector(".price").textContent;

        button.addEventListener("click", () => handlePayment(value));
    });

}

export default addPaymentEvent;