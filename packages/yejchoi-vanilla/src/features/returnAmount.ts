
import {amountStore} from "../amount/amountStore.ts";

import {addLog, updateTotalAmount} from "../utils/utiles.ts";

interface returnAmountProps {
    amountInputElement : HTMLInputElement | null;
    returnButtonElement : HTMLButtonElement | null;
}

export const returnAmount = (props : returnAmountProps) => {
    const { amountInputElement, returnButtonElement } = props;

    returnButtonElement?.addEventListener('click', () => {
        const totalAmount : number = amountStore.getAmount();

        const balance = totalAmount;

        if(totalAmount <= 0) {
            addLog(`반환할 잔액이 없습니다.`, 'error');
            return;
        }

        amountStore.resetAmount();
        updateTotalAmount(0);

        if(amountInputElement) {
            amountInputElement.value = '0';
        }

        addLog(`${balance.toLocaleString()}원 반환`);
    })

}
