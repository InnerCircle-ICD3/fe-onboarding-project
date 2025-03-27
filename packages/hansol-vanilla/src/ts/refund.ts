import { addLogMessage, BalanceManager, updateDisplay } from "./common";

const refundButton = document.querySelector<HTMLButtonElement>('.refund-button');

function handleRefundBalance() {
  let currentBalance = BalanceManager.get();
  addLogMessage(`${currentBalance} 원을 반환합니다.`);
  updateDisplay(0);
  BalanceManager.reset();
}

if(!refundButton) throw new Error('반환 버튼을 찾을 수 없습니다.');

refundButton.addEventListener('click', handleRefundBalance);