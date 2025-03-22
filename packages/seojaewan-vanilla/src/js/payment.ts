
import { totalPrice } from "./main";

const handlePayment = (name: string, value: string) => {
    const currentValue = Number(value);

    const totalPriceElement = document.querySelector(".total-price") as HTMLDivElement;
    const updatePrice = totalPrice.payment(name, currentValue);

    totalPriceElement.textContent = updatePrice.toString();
}

const addPaymentEvent = () => {
    const buttonList = document.querySelectorAll(".button--payment");

    buttonList.forEach((button) => {
        const value = (button as HTMLButtonElement).value;
        const name = (button as HTMLButtonElement).name;

        button.addEventListener("click", () => handlePayment(name,value));
    });

}

export default addPaymentEvent;