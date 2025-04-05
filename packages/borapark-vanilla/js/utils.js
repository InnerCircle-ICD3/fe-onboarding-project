/**
 * 화폐 단위 표시 함수
 * @param {number} currency
 * @param {string} [locale]
 */
export const formatCurrencyAsLocaleString = (currency, locale = "ko-KR") => {
  if (!Number.isInteger(currency) || currency < 0) {
    throw new Error("Invalid currency: only non-negative integers are allowed");
  }
  return currency.toLocaleString(locale);
};

/**
 * 금액 표시 화면 기능
 * @param {HTMLElement|string} element
 * @param {number} amount
 * @param {boolean} [needUnit]
 */
export const updateAmountDisplay = (element, amount, needUnit = false) => {
  if (!Number.isInteger(amount) || amount < 0) {
    throw new Error("Invalid currency: only non-negative integers are allowed");
  }

  const unit = "원";
  const amountElement = typeof element === "string" ? document.querySelector(element) : element;

  if (!amountElement) {
    throw new Error("Invalid element: element not found");
  }

  amountElement.textContent = `${formatCurrencyAsLocaleString(amount)}${needUnit ? unit : ""}`;
};
