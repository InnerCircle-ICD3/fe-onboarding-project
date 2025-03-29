/**
 * 화폐 단위 표시 함수
 * @param {number} currency
 * @param {string} [locale]
 */
export const formatCurrencyAsLocaleString = (currency, locale='ko-KR') => {
  if (
    typeof currency !== "number" ||
    isNaN(currency) ||
    currency < 0 ||
    !Number.isInteger(currency)
  ) {
    throw new Error("Invalid currency: only non-negative integers are allowed");
  }
  return currency.toLocaleString(locale);
};
