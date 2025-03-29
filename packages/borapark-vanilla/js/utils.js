/**
 * 화폐 단위 표시 함수
 * @param {number} currency
 * @param {string} [locale]
 */
export const formatCurrencyAsLocaleString = (currency, locale = "ko-KR") => {
  if (typeof currency !== "number" || isNaN(currency) || currency < 0 || !Number.isInteger(currency)) {
    throw new Error("Invalid currency: only non-negative integers are allowed");
  }
  return currency.toLocaleString(locale);
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

/**
 * 비동기 함수
 * @param {number} ms
 * @param {function (): void} callback (optional)
 * @returns {Promise<>}
 */
export const sleep = (ms, callback) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (callback) callback();
      resolve();
    }, ms)
  );
};
