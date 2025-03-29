import { BalanceManager, formatCurrencyKRW, getInputNumberValue } from "./common";

const currentBalance = BalanceManager.get();
const vendingMachineDisplay = document.querySelector<HTMLDivElement>('.vending-machine-display');
const controlInput = document.querySelector<HTMLInputElement>('.control-input');
const errorSpan = document.querySelector<HTMLSpanElement>('.error-message');

function initVendingMachine() {
  initVendingMachineDisplay();
  initControlInput();
}

function initVendingMachineDisplay() {
  if(!vendingMachineDisplay) throw new Error('자판기 금액창을 찾을 수 없습니다.');

  vendingMachineDisplay.innerText = formatCurrencyKRW(currentBalance);
}

function initControlInput() {
  if(!controlInput) throw new Error('금액 입력창을 찾을 수 없습니다.');
  
  controlInput.addEventListener('keyup', handleInputFormat);
}

function handleInputFormat(e: KeyboardEvent) {
  const target = e.target as HTMLInputElement;
  const value = getInputNumberValue(target);

  if(target.value === '') {
    return;
  }

  if(!value || value <= 0) {
    errorSpan?.classList.remove('hidden');
    target.value = '';
  } else {
    errorSpan?.classList.add('hidden');
    target.value = formatCurrencyKRW(value);
  }
}

initVendingMachine();