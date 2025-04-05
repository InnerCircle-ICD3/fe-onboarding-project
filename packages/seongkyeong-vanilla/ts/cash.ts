import { convertLocaleTextToNum } from "../util/localeTextConverter";
import { LogType, publishLogEvent } from "./log";

const $cashInput = document.querySelector<HTMLInputElement>("input[type=number].cash");
const $balanceOutput = document.querySelector<HTMLDivElement>(".balance");
const $putButton = document.querySelector<HTMLButtonElement>(".put-btn");
const $returnButton = document.querySelector<HTMLButtonElement>(".rtn-btn");
const $warningContent = document.querySelector<HTMLDivElement>(".warning-box.control");

$putButton?.addEventListener("click", () => {
    const cash = $cashInput?.valueAsNumber ?? 0;

    if (cash > 0) {
        putCash(cash);
        clearWarning();
        publishLogEvent({
            type: LogType.CASH_PUT,
            amount: cash
        });
    } else {
        setWarning("투입 금액은 0 이하일 수 없습니다.");
    }
});

$returnButton?.addEventListener("click", () => {
    if (!$balanceOutput) return;

    const balance = Number(convertLocaleTextToNum($balanceOutput.textContent ?? "0"));
    
    if (balance > 0) {
        returnCash(balance);
        clearWarning();
        publishLogEvent({
            type: LogType.CASH_RETURN,
            amount: balance,
        });
    } else {
        setWarning("반환할 금액이 없습니다.");
    }
});

const putCash = (cash: number) => {
    if ($cashInput && $balanceOutput instanceof HTMLDivElement) {
        let balance = Number(convertLocaleTextToNum($balanceOutput.textContent ?? "0"));

        $cashInput.value = "";
        balance += cash;
        
        $balanceOutput.textContent = balance.toLocaleString();
    }
}

const returnCash = (balance: number) => {
    if ($cashInput && $balanceOutput) {
        $cashInput.value = balance.toString();
        $balanceOutput.textContent = "0";
    }
}

const setWarning = (message: string) => {
    if ($warningContent) $warningContent.textContent = message;
}

const clearWarning = () => {
    if ($warningContent) $warningContent.textContent = "";
}