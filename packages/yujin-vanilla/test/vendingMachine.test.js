import { test, expect, beforeEach } from "vitest";
import { setupNumberInput } from "../src/numberInput.js"; // 모듈 가져오기

beforeEach(() => {
  setupNumberInput();
});

test("음수를 입력할경우 양수로 변횐되어 입력됩니다.", () => {
  const inputElement = document.querySelector(".number-input");
  inputElement.value = "-1000";

  // keyup 이벤트 발생
  inputElement.dispatchEvent(new Event("keyup"));

  // 마이너스 부호 제거 후 포맷팅되어야 함
  expect(inputElement.value).toBe("1,000");
});

test("숫자를 입력한 후 투입 버튼을 누르면 금액이 증가합니다.", () => {
  const numberInput = document.querySelectorAll(".number-input");
  const insertButton = document.querySelector("#button-insert");

  numberInput[0].value = "1000";
  numberInput[0].dispatchEvent(new Event("keyup"));

  insertButton.click()

  expect(numberInput[0].value).toBe("1,000");
  expect(numberInput[1].value).toBe(""); // 입력창 초기화 확인
});
