import { addLogMessage, getRequiredElement, appendParticle, updateDisplay } from "./common";
import { BalanceManager } from "./store";

const productGrid = getRequiredElement<HTMLTemplateElement>('.product-grid');
const vendingMachineDisplay = getRequiredElement<HTMLDivElement>('.vending-machine-display');

function handlePurchase(e: Event) {
  const target = e.target as HTMLElement;
  const productButton = target.closest<HTMLButtonElement>('.product-button');

  if (!productButton) throw new Error('상품 버튼을 찾을 수 없습니다.');

  const productName = productButton.querySelector<HTMLSpanElement>('.product-name')?.textContent;
  const productPrice = productButton.querySelector<HTMLSpanElement>('.product-price')?.textContent;

  if (!productName || !productPrice) throw new Error('상품 정보가 유효하지 않습니다.');

  let currentBalance = BalanceManager.get();
  const priceValue = Number(productPrice.replace(/[^0-9]/g, ''));
  const logText = appendParticle(productName);

  if (priceValue > currentBalance) {
    vendingMachineDisplay?.classList.add('error-border');
  } else {
    vendingMachineDisplay?.classList.remove('error-border');
    BalanceManager.purchase(priceValue);

    currentBalance = BalanceManager.get();
    addLogMessage(`${logText} 구매했습니다.`);
    updateDisplay(currentBalance);
  }
}

function initPurchaseEventListeners() {
  productGrid.addEventListener('click', handlePurchase);
}

initPurchaseEventListeners();