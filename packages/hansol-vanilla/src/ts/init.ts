import { BalanceManager, formatCurrencyKRW, getInputNumberValue } from "./common";

const currentBalance = BalanceManager.get();
const vendingMachineDisplay = document.querySelector<HTMLDivElement>('.vending-machine-display');
const controlInput = document.querySelector<HTMLInputElement>('.control-input');

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
  let value = getInputNumberValue(target);

  if(target.value === '') {
    target.classList.remove('input-error');
    return;
  }

  if(!value) {
    alert('양수만 입력해주세요');
    target.classList.add('input-error');
    target.value = '';
  } else {
    target.classList.remove('input-error');
    target.value = formatCurrencyKRW(value);
  }
}

initVendingMachine();