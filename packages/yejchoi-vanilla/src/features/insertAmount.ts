import {addLog, updateTotalAmount} from "../utils/utiles.ts";
import {amountStore} from "../amount/amountStore.ts";


export const insertAmount = () => {
    const amountInputElement = document.querySelector(".amount-inner-input") as HTMLInputElement;
    const insertButtonElement = document.querySelector('#insert-button') as HTMLButtonElement


    insertButtonElement.addEventListener("click", () => {
        const totalAmount : number = amountStore.getAmount()

        const value = Number(amountInputElement.value);

        if(value <= 0) {
            addLog('1원 이상 투입해주세요', 'error')
            return
        }

        amountStore.setAmount(totalAmount + value);

        updateTotalAmount(totalAmount + value)

        amountInputElement.value = '0';

        addLog(`${value.toLocaleString()}원 투입`);
    })
}