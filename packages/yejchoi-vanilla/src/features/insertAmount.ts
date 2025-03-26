import {addLog, updateTotalAmount} from "../utils/utiles.ts";
import {amountStore} from "../amount/amountStore.ts";

interface insertAmountProps {
    amountInputElement : HTMLInputElement | null;
    insertButtonElement : HTMLButtonElement | null;
}

export const insertAmount = (props : insertAmountProps) => {

    const {amountInputElement, insertButtonElement} = props;

    insertButtonElement?.addEventListener("click", () => {

        if(amountInputElement) {
            const totalAmount : number = amountStore.getAmount();

            const value = Number(amountInputElement.value);

            if(value <= 0) {
                addLog('1원 이상 투입해주세요', 'error');
                return;
            }

            if(totalAmount + value > 100000) {
                addLog('10만원 이상 넣을 수 없습니다.', 'error');
                return;
            }

            amountStore.setAmount(totalAmount + value);

            updateTotalAmount(totalAmount + value);

            amountInputElement.value = '0';

            addLog(`${value.toLocaleString()}원 투입`);
        }
    })
}