export class InputForm {
  render(onChange?: (e: Event) => void): HTMLTextAreaElement {
    // textarea 엘리먼트 생성
    const textarea = document.createElement("textarea");
    textarea.placeholder = "Enter product log";
    textarea.className =
      "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
    textarea.id = "product_log";
    if (onChange) {
      textarea.addEventListener("input", onChange);
    }

    // 숫자만 입력 가능하도록 이벤트 핸들러 추가
    textarea.addEventListener("input", function (e: Event) {
      if (e.target instanceof HTMLTextAreaElement) {
        // 숫자 이외의 문자는 제거
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
      }
    });

    return textarea;
  }
}
