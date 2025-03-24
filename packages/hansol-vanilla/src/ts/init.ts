import { BalaceManager } from "./common";

const currentBalance = BalaceManager.get();
const vendingMachineDisplay = document.querySelector('.vending-machine-display') as HTMLDivElement;

function initVendingMachine() {
  vendingMachineDisplay.innerText = currentBalance.toLocaleString();
}

initVendingMachine();