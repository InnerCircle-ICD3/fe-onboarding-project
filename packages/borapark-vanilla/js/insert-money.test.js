import { handleChangeAmount, handleSubmitInsertAmount } from "./insert-money.js";
import { currentAmount, setCurrentAmount } from "./store.js";

describe("투입 기능 테스트", () => {
  let $form;
  let $userAmount;
  let $vendingMachineTotalAmount;

  beforeEach(() => {
    // DOM 초기화
    document.body.innerHTML = `
      <form id="insert-form">
        <input type="number" id="user-amount" />
        <button type="submit">투입</button>
      </form>
      <div class="vending-machine-total-amount"></div>
    `;

    // DOM 요소 가져오기
    $form = document.getElementById("insert-form");
    $userAmount = document.getElementById("user-amount");
    $vendingMachineTotalAmount = document.querySelector(".vending-machine-total-amount");

    // DOM 요소 존재 확인
    expect($form).toBeDefined();
    expect($userAmount).toBeDefined();
    expect($vendingMachineTotalAmount).toBeDefined();

    // 상태 초기화
    setCurrentAmount(0);
  });

  test("투입 금액을 유저가 input 창에 입력하면, 현재 금액이 업데이트 된다.", () => {
    const userAmount = 1000;
    handleChangeAmount({ target: { value: userAmount } });
    expect(currentAmount).toBe(userAmount);
  });

  test("숫자가 아닌 값이 입력되면 현재 금액이 0으로 설정된다.", () => {
    handleChangeAmount({ target: { value: "abc" } });
    expect(currentAmount).toBe(0);
  });

  test("현재 금액이 업데이트 되면, 현재 금액의 누적 금액이 총 금액으로 업데이트 된다.", () => {
    const userAmount = 1000;
    handleChangeAmount({ target: { value: userAmount } });
    handleSubmitInsertAmount(new Event("submit"));
    expect($vendingMachineTotalAmount.textContent).toBe(`${userAmount}`);
  });

  test("금액 투입 후 form이 reset되고 현재 금액이 0으로 초기화된다.", () => {
    const userAmount = 1000;
    handleChangeAmount({ target: { value: userAmount } });
    handleSubmitInsertAmount(new Event("submit"));

    expect($userAmount.value).toBe("");
    expect(currentAmount).toBe(0);
    expect($vendingMachineTotalAmount.textContent).toBe("0");
  });
});
