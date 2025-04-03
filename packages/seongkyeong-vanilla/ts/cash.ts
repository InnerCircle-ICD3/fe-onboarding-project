import { convertLocaleTextToNum } from "../util/localeTextConverter";

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
    } else {
        setWarning("투입 금액은 0 이하일 수 없습니다.");
    }
});

$returnButton?.addEventListener("click", () => {
    if (!$balanceOutput) return;
    
    const balance = Number(convertLocaleTextToNum($balanceOutput.innerText) ?? 0);
    
    if (balance > 0) {
        returnCash(balance);
        clearWarning();
    } else {
        setWarning("반환할 금액이 없습니다.");
    }
});

const putCash = (cash: number) => {
    if ($cashInput && $balanceOutput) {
        let balance = convertLocaleTextToNum($balanceOutput.innerText);

        $cashInput.value = "";
        balance += cash;
        
        $balanceOutput.innerText = balance.toLocaleString();
    }
}

const returnCash = (balance: number) => {
    if ($cashInput && $balanceOutput) {
        $cashInput.value = balance.toString();
        $balanceOutput.innerText = "0";
    }
}

const setWarning = (message: string) => {
    if ($warningContent) $warningContent.innerText = message;
}

const clearWarning = () => {
    if ($warningContent) $warningContent.innerText = "";
}