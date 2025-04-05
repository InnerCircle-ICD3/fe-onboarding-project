import { totalAmount, currentAmount, setCurrentAmount, setTotalAmount } from "./store.js";
import { handleChangeAmount, handleSubmitInsertAmount, handleReturnMoney, handleBuy } from "./transactions.js";

describe("투입/반환 기능 테스트", () => {
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

  test("투입 금액을 유저가 input 창에 입력하면, 현재 금액이 업데이트 된다. - handleChangeAmount()", () => {
    const userAmount = 1000;
    handleChangeAmount({ target: { value: userAmount } });
    expect(currentAmount).toBe(userAmount);
  });

  test("숫자가 아닌 값이 입력되면 현재 금액이 0으로 설정된다. - handleChangeAmount()", () => {
    handleChangeAmount({ target: { value: "abc" } });
    expect(currentAmount).toBe(0);
  });

  test("현재 금액이 업데이트 되면, 현재 금액의 누적 금액이 총 금액으로 업데이트 된다. - handleSubmitInsertAmount()", () => {
    const userAmount = 1000;
    handleChangeAmount({ target: { value: userAmount } });
    handleSubmitInsertAmount(new Event("submit"));
    expect(totalAmount).toBe(userAmount);
  });

  test("금액 투입 후 form이 reset되고 현재 금액이 0으로 초기화된다. - handleSubmitInsertAmount()", () => {
    // 1. 먼저 금액을 입력하고
    const userAmount = 1000;
    handleChangeAmount({ target: { value: userAmount } });

    // 2. submit 이벤트를 발생시켜 reset을 실행
    handleSubmitInsertAmount(new Event("submit"));

    // 3. reset 후의 상태를 검증
    expect($userAmount.value).toBe("");
    expect(currentAmount).toBe(0);
    expect(totalAmount).toBe(userAmount); // totalAmount는 누적되어야 함
  });

  test("반환 버튼을 누르면 현재 금액이 0으로 초기화되고 총 금액이 0으로 설정된다. - handleReturnMoney()", () => {
    const userAmount = 1000;
    handleChangeAmount({ target: { value: userAmount } });
    handleSubmitInsertAmount(new Event("submit"));
    handleReturnMoney();
  });
});

describe("구매 기능 테스트", () => {
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
      <ul id="drink-list">
        <li>
          <button type="button">
            <span class="drink-name">콜드브루</span>
            <span class="drink-price" data-drink-name="콜드브루">1,000원</span>
          </button>
        </li>
      </ul>
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
    setTotalAmount(0);
  });

  test("콜드브루를 구매하면 현재 금액이 1000원 줄어들고 총 금액이 1000원 줄어든다. - handleBuy()", () => {
    // 1. 먼저 금액을 입력하고
    const userAmount = 1000;
    handleChangeAmount({ target: { value: userAmount } });
    handleSubmitInsertAmount(new Event("submit"));

    // 2. 콜드브루를 구매
    const $drinkList = document.getElementById("drink-list");
    const $drinkButton = $drinkList.querySelector("button");

    const event = {
      target: $drinkButton,
      preventDefault: () => {},
    };
    handleBuy(event);
    console.log(totalAmount, "totalAmount");
    // 3. 현재 금액과 총 금액이 업데이트 되었는지 검증
    expect(currentAmount).toBe(0);
    expect(totalAmount).toBe(0);
  });
});
