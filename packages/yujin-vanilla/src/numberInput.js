// ✅ numberInput.js를 ES 모듈로 변경
export function setupNumberInput() {
  const numberInputs = document.querySelectorAll(".numberInput");
  numberInputs.forEach((each) => {
    each.addEventListener("keyup", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      value = Number(value.replaceAll(",", ""));
      const formatValue = value.toLocaleString("ko-KR");
      each.value = formatValue;
    });
  });
}

export const getNumericValue = (input) => Number(input.value.replace(/\D/g, "")); // 숫자 변환 함수
