import { addLog, clearLogs } from "./logs.js";
import { handleSubmitInsertAmount, handleBuy, handleReturnMoney, handleChangeAmount } from "./transactions.js";
import { setCurrentAmount, setTotalAmount } from "./store.js";

describe("자판기 로그 테스트", () => {
  beforeEach(() => {
    // 테스트를 위한 DOM 요소 생성
    document.body.innerHTML = `
      <main>
        <section class="vending-machine-layout" aria-label="자판기">
          <div class="vending-machine-total-amount" role="status" aria-live="polite"></div>
          <ul role="list" aria-label="음료 목록" id="drink-list"></ul>
        </section>
        <article class="vending-machine-control-panel">
          <section class="vending-machine-input-box">
            <form aria-label="금액 입력">
              <fieldset class="vending-machine-input-fieldset">
                <legend class="fieldset-legend">투입 금액</legend>
                <input type="number" id="user-amount" aria-label="투입 금액" min=0 max=1000000000 required placeholder="0" aria-invalid="false" />
                <label for="user-amount">투입 금액</label>
              </fieldset>
              <fieldset class="vending-machine-button-fieldset">
                <legend class="fieldset-legend">금액 관리</legend>
                <button type="submit">투입</button>
                <button type="button">반환</button>
              </fieldset>
            </form>
          </section>
          <section class="vending-machine-log-box" role="log" aria-label="거래 내역">
          </section>
        </article>
      </main>
    `;
    clearLogs();
    setCurrentAmount(0);
    setTotalAmount(0);

    // window.alert 모의 함수 설정
    window.alert = jest.fn();
  });

  afterEach(() => {
    // 테스트 후 DOM 정리
    document.body.innerHTML = "";
    // window.alert 모의 함수 초기화
    window.alert.mockClear();
  });

  test("금액 입력 및 투입 시나리오", () => {
    // 1. 금액 입력
    const $input = document.createElement("input");
    $input.id = "user-amount";
    $input.value = "1000";
    const changeEvent = { target: $input };
    handleChangeAmount(changeEvent);

    // 2. 금액 투입
    const $form = document.createElement("form");
    $form.appendChild($input);
    const submitEvent = {
      preventDefault: () => {},
      target: $form,
    };
    handleSubmitInsertAmount(submitEvent);

    const logBox = document.querySelector(".vending-machine-log-box");
    expect(logBox.textContent).toBe("금액 1,000원이 투입되었습니다.");
  });

  test("음료 구매 시나리오", () => {
    // 1. 금액 투입
    setCurrentAmount(2000);
    setTotalAmount(2000);

    // 2. 음료 구매
    const $button = document.createElement("button");
    $button.innerHTML = `
      <span class="drink-name">콜라</span>
      <span class="drink-price">1,000원</span>
    `;
    const buyEvent = {
      preventDefault: () => {},
      target: $button,
    };
    handleBuy(buyEvent);

    const logBox = document.querySelector(".vending-machine-log-box");
    expect(logBox.textContent).toBe("콜라를 구매했습니다. (가격: 1,000원, 잔액: 1,000원)");
  });

  test("금액 부족 시나리오", () => {
    // 1. 금액 투입
    setCurrentAmount(500);
    setTotalAmount(500);

    // 2. 음료 구매 시도 (금액 부족)
    const $button = document.createElement("button");
    $button.innerHTML = `
      <span class="drink-name">콜라</span>
      <span class="drink-price">1,000원</span>
    `;
    const buyEvent = {
      preventDefault: () => {},
      target: $button,
    };
    handleBuy(buyEvent);

    const logBox = document.querySelector(".vending-machine-log-box");
    expect(logBox.textContent).toBe(""); // 금액 부족으로 구매 실패 시 로그 없음
  });

  test("금액 반환 시나리오", () => {
    // 1. 금액 투입
    setCurrentAmount(1000);
    setTotalAmount(1000);

    // 2. 금액 반환
    handleReturnMoney();

    const logBox = document.querySelector(".vending-machine-log-box");
    expect(logBox.textContent).toBe("잔액 1,000원이 반환되었습니다.");
  });

  test("전체 시나리오: 투입 → 구매 → 반환", () => {
    // 1. 금액 입력 및 투입
    const $input = document.createElement("input");
    $input.id = "user-amount";
    $input.value = "2000";
    const changeEvent = { target: $input };
    handleChangeAmount(changeEvent);

    const $form = document.createElement("form");
    $form.appendChild($input);
    const submitEvent = {
      preventDefault: () => {},
      target: $form,
    };
    handleSubmitInsertAmount(submitEvent);

    // 2. 음료 구매
    const $button = document.createElement("button");
    $button.innerHTML = `
      <span class="drink-name">콜라</span>
      <span class="drink-price">1,000원</span>
    `;
    const buyEvent = {
      preventDefault: () => {},
      target: $button,
    };
    handleBuy(buyEvent);

    // 3. 금액 반환
    handleReturnMoney();

    const logBox = document.querySelector(".vending-machine-log-box");
    const logElements = logBox.querySelectorAll("p");

    expect(logElements[0].textContent).toBe("금액 2,000원이 투입되었습니다.");
    expect(logElements[1].textContent).toBe("콜라를 구매했습니다. (가격: 1,000원, 잔액: 1,000원)");
    expect(logElements[2].textContent).toBe("잔액 1,000원이 반환되었습니다.");
  });
});
