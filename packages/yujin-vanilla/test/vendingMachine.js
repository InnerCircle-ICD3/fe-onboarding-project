import { test, expect, beforeEach } from "vitest";
import { setupNumberInput } from "../src/numberInput.js"; // 모듈 가져오기
import { getNumericValue } from "../src/numberInput.js"; // 숫자 변환 함수

beforeEach(() => {
  // 테스트 실행 전 가짜 DOM 설정
  document.body.innerHTML = `
    <input type="text" class="numberInput" placeholder="0원">
  `;

  setupNumberInput(); // 이벤트 리스너 등록
});

test("금액은 양수만 입력할 수 있습니다.", () => {
  const inputElement = document.querySelector(".numberInput");
  inputElement.value = "-1000";

  // keyup 이벤트 발생
  inputElement.dispatchEvent(new Event("keyup"));

  // 마이너스 부호 제거 후 포맷팅되어야 함
  expect(inputElement.value).toBe("1,000");
});


test("숫자를 입력한 후 투입 버튼을 누르면 금액이 증가합니다.", () => {
  document.body.innerHTML = `
    <input type="text" class="numberInput" placeholder="0원">
    <button id="button-insert">투입</button>
    <div id="screen">0</div>
  `;

  let total = 0;

  const inputElement = document.querySelector(".numberInput");
  const insertButton = document.querySelector("#button-insert");
  const screen = document.querySelector("#screen");

  inputElement.value = "1000";
  inputElement.dispatchEvent(new Event("keyup"));

  insertButton.addEventListener("click", () => {
    const depositAmount = getNumericValue(inputElement);
    total += depositAmount;
    screen.textContent = total.toLocaleString("ko-KR");
    inputElement.value = "";
  });

  insertButton.click(); // 버튼 클릭 이벤트 실행

  expect(screen.textContent).toBe("1,000");
  expect(inputElement.value).toBe(""); // 입력창 초기화 확인
});
