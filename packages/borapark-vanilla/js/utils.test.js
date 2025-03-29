import { formatCurrencyAsLocaleString, updateAmountDisplay } from "./utils.js";

describe("formatCurrencyAsLocaleString()", () => {
  test("숫자를 전달하면, 세 자리마다 쉼표를 추가한 문자열로 반환한다.", () => {
    expect(formatCurrencyAsLocaleString(1_000_000)).toBe("1,000,000");
    expect(formatCurrencyAsLocaleString(384_729_343)).toBe("384,729,343");
    expect(formatCurrencyAsLocaleString(857_295_720_374_230)).toBe("857,295,720,374,230");
  });

  test("0을 전달하면 '0'을 반환한다.", () => {
    expect(formatCurrencyAsLocaleString(0)).toBe("0");
  });

  test("음수를 전달하면 예외가 발생한다.", () => {
    expect(() => formatCurrencyAsLocaleString(-1000)).toThrow();
  });

  test("소수점을 포함한 숫자를 전달하면 예외가 발생한다.", () => {
    expect(() => formatCurrencyAsLocaleString(1234.56)).toThrow();
  });

  test("NaN을 전달하면 예외가 발생한다.", () => {
    expect(() => formatCurrencyAsLocaleString(NaN)).toThrow();
  });

  test("null을 전달하면 예외가 발생한다.", () => {
    expect(() => formatCurrencyAsLocaleString(null)).toThrow();
  });

  test("undefined를 전달하면 예외가 발생한다.", () => {
    expect(() => formatCurrencyAsLocaleString(undefined)).toThrow();
  });

  test("숫자 형태의 문자열을 전달하면 예외가 발생한다.", () => {
    expect(() => formatCurrencyAsLocaleString("1000")).toThrow();
  });

  test("객체나 배열을 전달하면 예외가 발생한다.", () => {
    expect(() => formatCurrencyAsLocaleString({})).toThrow();
    expect(() => formatCurrencyAsLocaleString([])).toThrow();
  });
});

describe("updateAmountDisplay", () => {
  let $element;

  beforeEach(() => {
    document.body.innerHTML = '<div id="amount-display"></div>';
    $element = document.querySelector("#amount-display");
  });

  test("숫자를 세 자리마다 쉼표(,)를 추가한 문자열로 표시한다.", () => {
    updateAmountDisplay("#amount-display", 1_000_000);
    expect($element.textContent).toBe("1,000,000");
  });

  test("단위를 포함하는 경우, 단위를 추가한 문자열을 표시한다.", () => {
    updateAmountDisplay("#amount-display", 1_000_000, true);
    expect($element.textContent).toBe("1,000,000원");
  });

  test("0 값을 전달하면 '0'이 표시된다.", () => {
    updateAmountDisplay("#amount-display", 0);
    expect($element.textContent).toBe("0");
  });

  test("유효하지 않은 selector를 전달하면 오류가 발생하지 않는다.", () => {
    expect(() => updateAmountDisplay("#invalid-selector", 1_000)).not.toThrow();
  });

  test("음수 값을 전달하면 에러가 발생한다.", () => {
    expect(() => updateAmountDisplay("#amount-display", -500_000)).toThrow(
      "Invalid currency: only non-negative integers are allowed"
    );
  });

  test("소수 값을 전달하면 에러가 발생한다.", () => {
    expect(() => updateAmountDisplay("#amount-display", 1_000.5)).toThrow(
      "Invalid currency: only non-negative integers are allowed"
    );
  });

  test("숫자가 아닌 값을 전달하면 에러가 발생한다.", () => {
    expect(() => updateAmountDisplay("#amount-display", "1_000")).toThrow(
      "Invalid currency: only non-negative integers are allowed"
    );
  });
});
