import { formatter } from './constants';

/** 자판기 남은 금액 */
const updateBalanceDisplay = (balance) => {
  const vendingMachineBalance = document.querySelector(
    '.vending-machine-balance'
  );
  vendingMachineBalance.textContent = `${formatter.format(
    balance
  )}원`;
};

export { updateBalanceDisplay };
