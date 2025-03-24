export const BalaceManager = (() => {
  let balance = 0;

  return {
    get: () => balance,
    add: (value: number) => {
      balance += value;
      return balance;
    },
    reset: () => {
      balance = 0;
    }
  };
})();

export function updateDisplay(currentBalance: number) {
  const display = document.querySelector('.vending-machine-display') as HTMLDivElement;

  display.textContent = currentBalance.toLocaleString();
}

export function addLogMessage(message: string) {
  const logList = document.querySelector('.log') as HTMLUListElement;
  const li = document.createElement('li');
  
  li.innerHTML = `<span class="log-message">${ message }</span>`;
  logList.appendChild(li);
}