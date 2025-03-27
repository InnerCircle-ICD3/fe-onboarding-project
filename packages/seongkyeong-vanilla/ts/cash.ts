const $cashInput = document.querySelector<HTMLInputElement>("input[type=number].cash");
const $balanceInput = document.querySelector<HTMLInputElement>("input[type=number].balance");
const $putButton = document.querySelector<HTMLButtonElement>(".put-btn");
const $returnButton = document.querySelector<HTMLButtonElement>(".rtn-btn");
const $warningContent = document.querySelector<HTMLDivElement>(".warning-box");

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
    const balance = $balanceInput?.valueAsNumber ?? 0;

    if (balance > 0) {
        returnCash(balance);
        clearWarning();
    } else {
        setWarning("반환할 금액이 없습니다.");
    }
});

const putCash = (cash: number) => {
    if ($cashInput && $balanceInput) {
        let balance = $balanceInput.valueAsNumber;

        $cashInput.value = "";
        balance += cash;
        
        $balanceInput.value = balance.toString();
    }
}

const returnCash = (balance: number) => {
    if ($cashInput && $balanceInput) {
        $cashInput.value = balance.toString();
        $balanceInput.value = "0";
    }
}

const setWarning = (message: string) => {
    if ($warningContent) $warningContent.innerText = message;
}

const clearWarning = () => {
    if ($warningContent) $warningContent.innerText = "";
}