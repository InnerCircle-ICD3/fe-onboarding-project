import { formatLocaleString } from "./utils.js";

describe("formatLocaleString", () => {
  test("숫자를 천 단위 구분자와 함께 포맷팅한다", () => {
    const currency1 = 1000000;
    const currency2 = 384729343;
    const currency3 = 857295720374230;
    expect(formatLocaleString(currency1)).toBe("1,000,000");
    expect(formatLocaleString(currency2)).toBe("384,729,343");
    expect(formatLocaleString(currency3)).toBe("857,295,720,374,230");
  });
});

describe("updateAmountDisplay", () => {
  test("금액을 표시한다", () => {
    const amount = 1000000;
    const amountElement = document.createElement("div");
    amountElement.textContent = formatLocaleString(amount);
    expect(amountElement.textContent).toBe("1,000,000");

    // needUnit 옵션이 true일 때
    const amountElement2 = document.createElement("div");
    amountElement2.textContent = formatLocaleString(amount, true);
    expect(amountElement2.textContent).toBe("1,000,000원");
  });
});
