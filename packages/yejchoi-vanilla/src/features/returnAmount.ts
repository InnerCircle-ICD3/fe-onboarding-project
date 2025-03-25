
import {amountStore} from "../amount/amountStore.ts";

import {addLog, updateTotalAmount} from "../utils/utiles.ts";

export const returnAmount = () => {
    const amountInputElement = document.querySelector(".amount-inner-input") as HTMLInputElement;
    const returnButtonElement = document.querySelector('#return-button') as HTMLButtonElement


    returnButtonElement.addEventListener('click', () => {
        const totalAmount : number = amountStore.getAmount()

        const balance = totalAmount;

        if(totalAmount <= 0) {
            addLog(`반환할 잔액이 없습니다.`, 'error');

            return;
        }

        amountStore.resetAmount();

        updateTotalAmount(0);

        amountInputElement.value = '0';

        addLog(`${balance.toLocaleString()}원 반환`);
    })

}
