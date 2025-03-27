import { createVendingMachineController } from './controller';
import './index.css';
import { store } from './store';
import { createVendingMachineView } from './view';

const vendingMachineDomSelectors = {
  getProductButtonContainer: () => document.querySelector('.vending-machine-button-container'),
  getMoneyAmountInput: () => document.querySelector('.amount-input'),
  getMoneyInsertForm: () => document.querySelector('.vending-machine-insert-form'),
  getMoneyReturnButton: () => document.querySelector('.return-money-button'),
  getVendingMachineBalance: () => document.querySelector('.vending-machine-balance'),
  getLogContainer: () => document.querySelector('.log-message-container > div'),
};

document.addEventListener('DOMContentLoaded', () => {
  const view = createVendingMachineView(vendingMachineDomSelectors);
  view.bindEventListeners();
  view.renderProducts(store.getProducts());
  view.renderBalanceDisplay(store.getBalance());
});
