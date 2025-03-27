// #region 투입 기능
const handleChangeAmount = (event) => {
  // 입력창에 focus 했을 때 값 초기화
  if(event.target.focus) {
    event.target.value = "";
  }
  const userAmount = getUserAmount();
  currentAmount = Number(userAmount);
  console.log(currentAmount);
};

const handleClickInsertAmountButton = () => {
  totalAmount += currentAmount;
  console.log(totalAmount, "total");
  updateAmountDisplay(".vending-machine-total-amount", totalAmount);
  currentAmount = 0; // 초기화
};

// 투입 금액 입력 이벤트 리스너
document.getElementById("user-amount").addEventListener("change", handleChangeAmount);

// 투입 금액 입력 버튼 클릭 이벤트 리스너
const insertButton = document.querySelector(".vending-machine-button-fieldset > button:nth-child(1)");
insertButton.addEventListener("click", handleClickInsertAmountButton);