export const BalanceManager = (() => {
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
  const display = document.querySelector<HTMLDivElement>('.vending-machine-display');
  if(!display) throw new Error('자판기 디스플레이를 찾을 수 없습니다.');
  
  const formatted = formatCurrencyKRW(currentBalance);
  display.textContent = formatted;
}

export function addLogMessage(message: string) {
  const logList = document.querySelector<HTMLUListElement>('.log');
  const li = document.createElement('li');
  if(!logList) throw new Error('로그 영역을 찾을 수 없습니다.');
  
  li.innerHTML = `<span class="log-message">${ message }</span>`;
  logList.appendChild(li);
}

export function getInputNumberValue(input: HTMLInputElement | null): number {
  if (!input) return NaN;
  const raw = input.value.replace(/,/g, '');
  return Number(raw);
}

export function formatCurrencyKRW(amount: number): string {
  return amount.toLocaleString('ko-KR');
}