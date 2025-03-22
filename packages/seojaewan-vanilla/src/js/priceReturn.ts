import { totalPrice } from "./main";

const handlePriceReturn = () => {
    const totalPriceElement = document.querySelector(".total-price") as HTMLDivElement;

    totalPrice.resetTotalPrice();
    totalPriceElement.textContent = "0";
}


const addReturnEvent = () => {
    const returnPriceElement = document.querySelector(".return-price") as HTMLButtonElement;

    returnPriceElement.addEventListener("click", handlePriceReturn);
}

export default addReturnEvent;