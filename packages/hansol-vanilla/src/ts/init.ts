import { formatCurrencyKRW, getRequiredElement } from "./common";
import { BalanceManager, products } from "./store";

const currentBalance = BalanceManager.get();
const productGrid = getRequiredElement<HTMLUListElement>('.product-grid');
const productTemplate = getRequiredElement<HTMLTemplateElement>('.product-template');

function initVendingMachine() {
  initVendingMachineDisplay();
  drawProductButton();
}

function drawProductButton() {
  for (const product of products) {
    const buttonClone = productTemplate.content.cloneNode(true) as DocumentFragment;
    const buttonName = buttonClone.querySelector<HTMLSpanElement>('.product-name');
    const buttonPrice = buttonClone.querySelector<HTMLSpanElement>('.product-price');

    if(buttonName) buttonName.textContent = product.name;
    if(buttonPrice) buttonPrice.textContent = product.price;
    productGrid.appendChild(buttonClone);
  }
}

function initVendingMachineDisplay() {
  const vendingMachineDisplay = getRequiredElement<HTMLDivElement>('.vending-machine-display');

  vendingMachineDisplay.innerText = formatCurrencyKRW(currentBalance);
}

initVendingMachine();