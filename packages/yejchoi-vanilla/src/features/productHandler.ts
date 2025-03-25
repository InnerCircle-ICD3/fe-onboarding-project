
import {amountStore} from "../amount/amountStore.ts";
import {addLog, updateTotalAmount} from "../utils/utiles.ts";
import {Product} from "../types/types.ts";

export const handleProductButton = (product : Product) => {

    const productButtonElement = document.querySelector<HTMLDivElement>(`#product-${product.id}`);
    const totalAmountElement = document.querySelector<HTMLDivElement>(".total-amount");

    productButtonElement?.addEventListener("mousedown", () => {
        const totalAmount : number = amountStore.getAmount();

        if (totalAmount < product.price && totalAmountElement) {
            totalAmountElement.textContent = product.price.toLocaleString();
        } else {
            amountStore.setAmount(totalAmount - product.price)
            addLog(`${product.name} 구매 (${product.price.toLocaleString()}원 차감)`);
        }
    })

    productButtonElement?.addEventListener('mouseup', () => {
        const totalAmount : number = amountStore.getAmount();

        updateTotalAmount(totalAmount);
    })
}