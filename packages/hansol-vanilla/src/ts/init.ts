import { formatCurrencyKRW, getRequiredElement } from "./common";
import { BalanceManager } from "./store";

function initVendingMachine() {
  initVendingMachineDisplay();
}

function initVendingMachineDisplay() {
  const vendingMachineDisplay = getRequiredElement<HTMLDivElement>('.vending-machine-display');
  const currentBalance = BalanceManager.get();

  vendingMachineDisplay.innerText = formatCurrencyKRW(currentBalance);
}

initVendingMachine();