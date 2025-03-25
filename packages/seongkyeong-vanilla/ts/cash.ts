const $cashInput = document.querySelector(".cash") as HTMLInputElement;
const $balanceInput = document.querySelector(".balance") as HTMLInputElement;
const $putButton = document.querySelector(".put-btn") as HTMLButtonElement;
const $returnButton = document.querySelector(".rtn-btn") as HTMLButtonElement;
const $warningContent = document.querySelector(".warning-box") as HTMLDivElement;

const putCash = (cash: number) => {
    let balance = Number($balanceInput.value);

    $cashInput.value = "";
    balance += cash;
    
    $balanceInput.value = balance.toString();
}

const returnCash = (balance: number) => {
    $cashInput.value = balance.toString();
    $balanceInput.value = "0";
}

$putButton.addEventListener("click", () => {
    const cash = Number($cashInput.value);

    if (cash > 0) {
        putCash(cash);
        clearWarning();
    } else {
        setWarning("투입 금액은 0 이하일 수 없습니다.");
    }
});

$returnButton.addEventListener("click", () => {
    const balance = Number($balanceInput.value);

    if (balance > 0) {
        returnCash(balance);
        clearWarning();
    } else {
        setWarning("반환할 금액이 없습니다.");
    }
});

const setWarning = (message: string) => {
    $warningContent.innerText = message;
}

const clearWarning = () => {
    $warningContent.innerText = "";
}