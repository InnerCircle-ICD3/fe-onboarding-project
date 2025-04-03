import { createVendingMachineController } from './controller';
import '../index.css';
import { createVendingMachineService } from './services';
import { store } from './store';
import { createVendingMachineView } from './view';

document.addEventListener('DOMContentLoaded', () => {
  const view = createVendingMachineView();
  const service = createVendingMachineService(store);
  const controller = createVendingMachineController(service, view, store);

  view.setEventHandlers({
    onMoneyAmountInput: controller.handleMoneyAmountInput,
    onMoneyInsert: controller.handleMoneyInsert,
    onProductPurchase: controller.handleProductPurchase,
    onMoneyReturn: controller.handleMoneyReturn,
    onPurchaseValidate: controller.handlePurchaseValidate,
    onPurchaseValidateEnd: controller.handlePurchaseValidateEnd,
  });
  view.bindEventListeners();
  view.renderProducts(store.getProducts());
  view.renderBalanceDisplay(store.getBalance());
});
