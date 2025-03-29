// 상태 변수
let totalAmount = 0;
let currentAmount = 0;

// 상태 업데이트 함수
const setTotalAmount = () => {
  totalAmount += currentAmount;
  return totalAmount;
};
const setCurrentAmount = (amount) => {
  currentAmount = amount;
  return currentAmount;
};
