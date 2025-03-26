import { ERROR_MESSAGES } from './constants';
import { buyProduct } from './services';
import { renderLog } from './utils';
import { setVendingMachineBalance } from './view';

/** 상품 구매 기능 */
export const handleBuyProductClick = (e) => {
  const button = e.target.closest('.product-button');
  if (!button) return;

  const productId = button.dataset.id;

  const { success, product, updatedBalance, errorCode } =
    buyProduct(productId);

  if (!success) {
    const errorMessage = ERROR_MESSAGES[errorCode];
    return renderLog(errorMessage);
  }

  setVendingMachineBalance(updatedBalance);
  renderLog(`${product.name}을(를) 구매하셨습니다.`);
};
