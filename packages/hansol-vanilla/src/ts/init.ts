import { BalaceManager } from "./common";

const currentBalance = BalaceManager.get();
const vendingMachineDisplay = document.querySelector<HTMLDivElement>('.vending-machine-display');

function initVendingMachine() {
  if(!vendingMachineDisplay) throw new Error('자판기 금액창을 찾을 수 없습니다.');
  
  vendingMachineDisplay.innerText = currentBalance.toLocaleString();
}

initVendingMachine();