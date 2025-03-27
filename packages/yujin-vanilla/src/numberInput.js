export const setupNumberInput = () => {
  const numberInputs = document.querySelectorAll(".number-input");
  numberInputs.forEach((each) => {
    each.addEventListener("keyup", function (e) {
      const numericValue = getNumericValue(e.target);
      each.value = setCurrencyToWon(numericValue);
    });
  });
}

export const getNumericValue = (input) => Number(input.value.replace(/\D/g, "")); // 숫자 변환 함수
export const setCurrencyToWon = (value) => value.toLocaleString("ko-KR");
