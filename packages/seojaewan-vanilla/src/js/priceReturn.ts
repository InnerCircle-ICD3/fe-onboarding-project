import checkInstance from "./checkType";
import addLogging from "./logging";
import { totalPrice } from "./main";

const handlePriceReturn = () => {
    const totalPriceElement = document.querySelector(".total-price");
    
    if(!checkInstance(totalPriceElement, HTMLParagraphElement)) return;

    totalPriceElement.textContent = totalPrice.resetTotalPrice().toString();
    addLogging("금액이 반환되었습니다.");
}


const addReturnEvent = () => {
    const returnPriceElement = document.querySelector(".return-price");

    if(checkInstance(returnPriceElement, HTMLButtonElement)) returnPriceElement.addEventListener("click", handlePriceReturn);
}

export default addReturnEvent;