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

export function getRequiredElement<T extends HTMLElement>(selector: string): T {
  const el = document.querySelector<T>(selector);
  if (!el) throw new Error(`${selector} 요소를 찾을 수 없습니다.`);
  return el;
}

export function appendParticle(str: string) {
  const lastCharCode = str.charCodeAt(str.length - 1);
  const particle = (lastCharCode - 44032) % 28 ? '을' : '를';
  return str + particle;
}