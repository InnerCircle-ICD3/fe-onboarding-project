import { createVendingMachineController } from './controller';
import '../index.css';
import { createVendingMachineService } from './services';
import { store } from './store';
import { createVendingMachineView } from './view';
import { domSelectors } from './dom-selectors';

document.addEventListener('DOMContentLoaded', () => {
  const view = createVendingMachineView(domSelectors);
  const service = createVendingMachineService(store);
  const controller = createVendingMachineController(service, view, store);

  view.setEventHandlers({
    onMoneyAmountInput: controller.handleMoneyAmountInput,
    onMoneyInsert: controller.handleMoneyInsert,
    onProductPurchase: controller.handleProductPurchase,
    onMoneyReturn: controller.handleMoneyReturn,
    onPurchaseValidate: controller.handlePurchaseValidate,
    onPurchaseValidateEnd: controller.handleProductValidateEnd,
  });
  view.bindEventListeners();
  view.renderProducts(store.getProducts());
  view.renderBalanceDisplay(store.getBalance());
});
