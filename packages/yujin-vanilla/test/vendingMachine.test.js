import { test, expect, beforeEach } from "vitest";
import { setupNumberInput } from "../src/numberInput.js"; // 모듈 가져오기
import { handleInsert, handleRefund } from "../src/vendingMachine.js";

beforeEach(() => {
  setupNumberInput();
});

test("초기 상태에서 금액 표시창과 투입금액창은 기본 0을 표시합니다.", () => {
    const numberInput = document.querySelectorAll(".number-input");
    expect(numberInput[0].value).toBe("0");
    expect(numberInput[1].value).toBe("0");
});

test("음수를 입력할경우 양수로 변횐되어 입력됩니다.", () => {
  const numberInput = document.querySelectorAll(".number-input");
  numberInput[1].value = "-1000";

  // keyup 이벤트 발생
  numberInput[1].dispatchEvent(new Event("keyup"));

  // 마이너스 부호 제거 후 포맷팅되어야 함
  expect(numberInput[1].value).toBe("1,000");
});

test("빈 문자열 입력 시 투입 버튼을 누르면 변화가 없어야 합니다.", () => {
  const numberInput = document.querySelectorAll(".number-input");
  const insertButton = document.querySelector("#button-insert");

  numberInput[1].value = "";
  insertButton.click();

  // 기존 금액이 변경되지 않았는지 확인
  expect(numberInput[0].value).toBe("0");
});

test("숫자를 입력한 후 투입 버튼을 누르면 금액이 증가합니다.", () => {
  const numberInput = document.querySelectorAll(".number-input");
  const insertButton = document.querySelector("#button-insert");

  numberInput[1].value = "1000";
  numberInput[1].dispatchEvent(new Event("keyup"));

  insertButton.click()
  handleInsert();
  expect(numberInput[0].value).toBe("1,000");
  expect(numberInput[1].value).toBe("0"); // 입력창 초기화 확인
});

test("반환 버튼을 누르면 투입금액창이 초기화됩니다.", ()=> {
    const numberInput = document.querySelectorAll(".number-input");
    const refundButton = document.querySelector("#button-refund");

    refundButton.click();
    handleRefund();

    expect(numberInput[0].value).toBe("0")
})


test("연속 투입 시 누적 금액이 올바르게 계산됩니다", () => {
  const numberInput = document.querySelectorAll(".number-input");
  const insertButton = document.querySelector("#button-insert");

  numberInput[1].value = "1000";
  numberInput[1].dispatchEvent(new Event("keyup"));
  insertButton.click();
  handleInsert();

  numberInput[1].value = "500";
  numberInput[1].dispatchEvent(new Event("keyup"));
  insertButton.click();
  handleInsert();

  expect(numberInput[0].value).toBe("1,500");
  expect(numberInput[1].value).toBe("0"); // 입력창 초기화 확인
});
