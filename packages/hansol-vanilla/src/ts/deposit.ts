import { addLogMessage, formatCurrencyKRW, getInputNumberValue, getRequiredElement, updateDisplay } from "./common";
import { BalanceManager } from "./store";

const controlInput = getRequiredElement<HTMLInputElement>('.control-input');
const addButton = getRequiredElement<HTMLButtonElement>('.add-button');
const errorMessageSpan = getRequiredElement<HTMLSpanElement>('.error-message');

function handleAddBalance() {
  const inputValue =  getInputNumberValue(controlInput);

  if (inputValue <= 0) {
    showInputError();
  } else {
    hideInputError();
    
    BalanceManager.add(inputValue);
    updateDisplay(BalanceManager.get());
    addLogMessage(`${formatCurrencyKRW(inputValue)}원을 투입했습니다.`);
    
    controlInput.value = '';
  }
}

function handleInputFormat(e: KeyboardEvent) {
  const target = e.target as HTMLInputElement;
  const value = getInputNumberValue(target);

  if(target.value === '') {
    return;
  }

  if(!value || value <= 0) {
    showInputError();
    target.value = '';
  } else {
    hideInputError();
    target.value = formatCurrencyKRW(value);
  }
}

function showInputError() {
  errorMessageSpan.classList.remove('hidden');
  controlInput.classList.add('error-border');
}

function hideInputError() {
  errorMessageSpan.classList.add('hidden');
  controlInput.classList.remove('error-border');
}

function initAddEventListeners() {
  controlInput.addEventListener('keyup', handleInputFormat);
  addButton.addEventListener('click', handleAddBalance);
}

initAddEventListeners();