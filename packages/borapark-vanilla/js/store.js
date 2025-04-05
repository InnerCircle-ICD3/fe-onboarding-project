// 상태 변수
let totalAmount = 0;
let currentAmount = 0;

/**
 * 총 금액 업데이트
 * @param {number} [amount]
 * @returns {number}
 */
const setTotalAmount = (amount) => {
  if (amount !== undefined) {
    totalAmount = amount;
  } else {
    totalAmount += currentAmount;
  }
  return totalAmount;
};

/**
 * 현재 금액 업데이트
 * @param {number} amount
 * @returns {number}
 */
const setCurrentAmount = (amount) => {
  currentAmount = amount;
  return currentAmount;
};

export { totalAmount, currentAmount, setTotalAmount, setCurrentAmount };
