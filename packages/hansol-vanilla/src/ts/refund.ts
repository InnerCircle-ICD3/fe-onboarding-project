import { addLogMessage, BalanceManager, updateDisplay } from "./common";


let currentBalance = BalanceManager.get();

const refundButton = document.querySelector<HTMLButtonElement>('.refund-button');

function handleRefundBalance() {
  updateDisplay(0);
  addLogMessage(`${currentBalance} 원을 반환합니다.`);
  BalanceManager.reset();
}

if(!refundButton) throw new Error('반환 버튼을 찾을 수 없습니다.');

refundButton.addEventListener('click', handleRefundBalance);