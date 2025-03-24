import { addLogMessage, BalaceManager, updateDisplay } from "./common";

let currentBalance = BalaceManager.get();

const controlInput = document.querySelector('.control-input') as HTMLInputElement;
const addButton = document.querySelector('.add-button') as HTMLButtonElement;


function handleAddMoney() {
  const inputValue = Number(controlInput?.value);

  if (inputValue <= 0) {
    alert('유효한 금액을 입력해주세요.');
    return;
  }
  
  BalaceManager.add(inputValue);
  updateDisplay(currentBalance);
  addLogMessage(`${inputValue.toLocaleString()}원을 투입했습니다.`);

  controlInput.value = '';
}

addButton.addEventListener('click', handleAddMoney);