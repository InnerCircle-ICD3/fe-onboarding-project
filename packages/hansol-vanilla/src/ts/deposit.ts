import { addLogMessage, BalaceManager, updateDisplay } from "./common";

const controlInput = document.querySelector<HTMLInputElement>('.control-input');
const addButton = document.querySelector<HTMLButtonElement>('.add-button');

function handleAddBalance() {
  const inputValue = Number(controlInput?.value);

  if (inputValue <= 0) {
    alert('유효한 금액을 입력해주세요.');
    return;
  }
  
  BalaceManager.add(inputValue);
  updateDisplay(BalaceManager.get());
  addLogMessage(`${inputValue.toLocaleString()}원을 투입했습니다.`);
  
  if(!controlInput) throw new Error('금액 입력창을 찾을 수 없습니다.');

  controlInput.value = '';
}

if(!addButton) throw new Error('투입 버튼을 찾을 수 없습니다.');

addButton.addEventListener('click', handleAddBalance);