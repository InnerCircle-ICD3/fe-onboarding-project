/**
 * 화폐 단위 표시 함수
 * @param {number} currency
 */
export const formatLocaleString = (currency) => {
  return currency.toLocaleString();
};

/**
 * 금액 표시 화면 기능
 * @param {string} selector
 * @param {number} amount
 * @param {boolean} needUnit (optional)
 */
export const updateAmountDisplay = (selector, amount, needUnit = false) => {
  const unit = "원";
  const amountElement = document.querySelector(selector);
  amountElement.textContent = `${formatLocaleString(amount)}${needUnit ? unit : ""}`;
};
