
import { totalPrice } from "./main";

const handlePayment = (value: string) => {
    const currentValue = Number(value);

    const totalPriceElement = document.querySelector(".total-price") as HTMLDivElement;
    const updatePrice = totalPrice.payment(currentValue);

    totalPriceElement.textContent = updatePrice.toString();
}

const addPaymentEvent = () => {
    const buttonList = document.querySelectorAll(".button--payment");

    buttonList.forEach((button) => {
        const value = (button as HTMLButtonElement).value;

        button.addEventListener("click", () => handlePayment(value));
    });

}

export default addPaymentEvent;