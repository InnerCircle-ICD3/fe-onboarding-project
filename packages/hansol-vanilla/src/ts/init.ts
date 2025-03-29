import { formatCurrencyKRW, getRequiredElement } from "./common";
import { BalanceManager, products } from "./store";

const PRODUCT_COLUMNS = 3;
const PRODUCT_ROWS = Math.ceil(products.length / PRODUCT_COLUMNS);
const TOTAL_SLOT = PRODUCT_COLUMNS * PRODUCT_ROWS;

const currentBalance = BalanceManager.get();
const productGrid = getRequiredElement<HTMLUListElement>('.product-grid');
const productTemplate = getRequiredElement<HTMLTemplateElement>('.product-template');

function initVendingMachine() {
  initVendingMachineDisplay();
  drawProductButton();
}

function drawProductButton() {
  for (let i = 0; i < TOTAL_SLOT; i++) {
    const product = products[i];

    if (product) {
      const buttonClone = productTemplate.content.cloneNode(true) as DocumentFragment;
      const buttonName = buttonClone.querySelector<HTMLSpanElement>('.product-name');
      const buttonPrice = buttonClone.querySelector<HTMLSpanElement>('.product-price');

      if(buttonName) buttonName.textContent = product.name;
      if(buttonPrice) buttonPrice.textContent = product.price;

      productGrid.appendChild(buttonClone);
    } else {
      const disabledButton = document.createElement('button');
      disabledButton.classList.add('product-button');
      disabledButton.disabled = true;

      productGrid.appendChild(disabledButton);
    }
  }
}

function initVendingMachineDisplay() {
  const vendingMachineDisplay = getRequiredElement<HTMLDivElement>('.vending-machine-display');

  vendingMachineDisplay.innerText = formatCurrencyKRW(currentBalance);
}

initVendingMachine();