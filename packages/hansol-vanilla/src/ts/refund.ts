import { addLogMessage, getRequiredElement, updateDisplay } from "./common";
import { BalanceManager } from "./store";

function handleRefundBalance() {
  const controlInput = getRequiredElement<HTMLInputElement>('.control-input');

  if(!controlInput.value) {
    return;
  }

  let currentBalance = BalanceManager.get();
  addLogMessage(`${currentBalance} 원을 반환합니다.`);
  updateDisplay(0);
  BalanceManager.reset();
}

function initRefundEventListeners() {
  const refundButton = getRequiredElement<HTMLButtonElement>('.refund-button');

  refundButton.addEventListener('click', handleRefundBalance);
}

initRefundEventListeners();