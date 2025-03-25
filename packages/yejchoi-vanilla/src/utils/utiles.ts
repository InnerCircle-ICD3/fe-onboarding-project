const logBoxElement = document.querySelector(".log-box") as HTMLDivElement
const totalAmountElement = document.querySelector(".total-amount") as HTMLDivElement

export const addLog = (message : string, state?: string) => {
    const logElement = document.createElement("div");

    logElement.className = `${state === 'error' ? 'error' : ''} log-message`;
    logElement.textContent = message;
    logBoxElement.appendChild(logElement);
    logBoxElement.scrollTop = logBoxElement.scrollHeight;
}

export const updateTotalAmount = (value : number) => {
    totalAmountElement.textContent = value.toLocaleString()
}