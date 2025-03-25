const logBoxElement = document.querySelector<HTMLDivElement>(".log-box")
const totalAmountElement = document.querySelector<HTMLDivElement>(".total-amount")

export const addLog = (message : string, state?: string) => {
    const logElement = document.createElement("div");

    if(logBoxElement) {
        logElement.className = `${state === 'error' ? 'error' : ''} log-message`;
        logElement.textContent = message;
        logBoxElement.appendChild(logElement);
        logBoxElement.scrollTop = logBoxElement.scrollHeight;
    }
}

export const updateTotalAmount = (value : number) => {
    if(totalAmountElement) {
        totalAmountElement.textContent = value.toLocaleString();
    }
}