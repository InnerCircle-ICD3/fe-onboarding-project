/**
 * 화폐 단위 표시 함수
 * @param {number} currency
 * @param {string} [locale]
 */
export const formatCurrencyAsLocaleString = (currency, locale='ko-KR') => {
  return currency.toLocaleString(locale);
};
