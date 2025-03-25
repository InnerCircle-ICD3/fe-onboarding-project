/**
 * 숫자를 천단위 구분자(쉼표)가 포함된 문자열로 변환
 * @param {number} number - 변환할 숫자
 * @returns {string} 천단위 구분자가 포함된 문자열
 */
export const formatNumber = (number) => {
  return number.toLocaleString("ko-KR");
};

/**
 * 문자열에서 숫자만 추출하여 반환
 * @param {string} value - 변환할 문자열
 * @returns {number} 추출된 숫자 (숫자가 아닌 경우 0)
 */
export const extractNumber = (value) => {
  return parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
};
