import { addLogMessage, getRequiredElement, updateDisplay } from "./common";
import { BalanceManager } from "./store";

function handleRefundBalance() {
  let currentBalance = BalanceManager.get();
  
  if(!currentBalance) {
    return;
  }
  addLogMessage(`${currentBalance} 원을 반환합니다.`);
  updateDisplay(0);
  BalanceManager.reset();
}

function initRefundEventListeners() {
  const refundButton = getRequiredElement<HTMLButtonElement>('.refund-button');

  refundButton.addEventListener('click', handleRefundBalance);
}

initRefundEventListeners();