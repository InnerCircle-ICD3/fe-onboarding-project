// import { setupEventListeners } from './controller';
import './index.css';
import { store } from './store';
import { createVendingMachineView } from './view';

const vendingMachineDomSelectors = {
  getButtonContainer: () => document.querySelector('.vending-machine-button-container'),
  getVendingMachineBalance: () => document.querySelector('.vending-machine-balance'),
  getLogContainer: () => document.querySelector('.log-message-container > div'),
};

document.addEventListener('DOMContentLoaded', () => {
  const view = createVendingMachineView(vendingMachineDomSelectors);

  view.renderProducts(store.getProducts());
  view.renderBalanceDisplay(store.getBalance());

  // setupEventListeners();
});
