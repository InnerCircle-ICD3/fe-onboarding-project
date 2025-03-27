import { createVendingMachineController } from './controller';
import '../index.css';
import { createVendingMachineService } from './services';
import { store } from './store';
import { createVendingMachineView } from './view';
import { domSelectors } from './dom-selectors';

document.addEventListener('DOMContentLoaded', () => {
  const view = createVendingMachineView(domSelectors);
  const service = createVendingMachineService(store);
  const controller = createVendingMachineController(service, view);

  view.setEventHandlers({
    onMoneyAmountInput: controller.handleMoneyAmountInput,
    onMoneyInsert: controller.handleMoneyInsert,
    onProductPurchase: controller.handleProductPurchase,
    onMoneyReturn: controller.handleMoneyReturn,
  });
  view.bindEventListeners();
  view.renderProducts(store.getProducts());
  view.renderBalanceDisplay(store.getBalance());
});
