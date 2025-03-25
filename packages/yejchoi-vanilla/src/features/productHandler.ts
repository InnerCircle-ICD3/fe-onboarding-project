
import {amountStore} from "../amount/amountStore.ts";
import {addLog, updateTotalAmount} from "../utils/utiles.ts";
import {Product} from "../types/types.ts";

const totalAmountElement = document.querySelector(".total-amount") as HTMLDivElement


export const handleProductButton = (product : Product) => {

    const productButtonElement = document.querySelector(`#product-${product.id}`) as HTMLDivElement

    productButtonElement.addEventListener("mousedown", () => {
        const totalAmount : number = amountStore.getAmount()

        if(totalAmount < product.price) {
            totalAmountElement.textContent = product.price.toLocaleString();
        } else {
            amountStore.setAmount(totalAmount - product.price)
            addLog(`${product.name} 구매 (${product.price.toLocaleString()}원 차감)`);
        }
    })

    productButtonElement.addEventListener('mouseup', () => {
        const totalAmount : number = amountStore.getAmount()

        updateTotalAmount(totalAmount)
    })
}