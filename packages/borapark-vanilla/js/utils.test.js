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

  test("0 또는 양의 정수가 아닌 값을 전달하면 예외가 발생한다", () => {
    const disallowed = [-1000, 1234.56, NaN, null, undefined, "1000", {}, []];
    for (const value of disallowed) {
      expect(() => formatCurrencyAsLocaleString(value)).toThrow();
    }
  });
});

/**
 * @jest-environment jsdom
 */
describe("updateAmountDisplay", () => {
  let $element;

  beforeEach(() => {
    document.body.innerHTML = '<div id="amount-display"></div>';
    $element = document.querySelector("#amount-display");
    expect($element).not.toBeNull();
  });

  test("숫자를 세 자리마다 쉼표(,)를 추가한 문자열로 표시한다.", () => {
    updateAmountDisplay($element, 1_000_000);
    expect($element.textContent).toBe("1,000,000");
  });

  test("단위를 포함하는 경우, 단위를 추가한 문자열을 표시한다.", () => {
    updateAmountDisplay($element, 1_000_000, true);
    expect($element.textContent).toBe("1,000,000원");
  });

  test("0 값을 전달하면 '0'이 표시된다.", () => {
    updateAmountDisplay($element, 0);
    expect($element.textContent).toBe("0");
  });

  test("양수를 전달하면 예외가 발생하지 않는다.", () => {
    expect(() => updateAmountDisplay($element, 1_000)).not.toThrow();
  });

  test("양수 또는 0이 아닌 값(음수, 소수, NaN, null, undefined, 문자열, 객체, 배열)을 전달하면 예외가 발생한다.", () => {
    const disallowed = [-1000, 1234.56, NaN, null, undefined, "1000", {}, []];
    for (const value of disallowed) {
      expect(() => updateAmountDisplay($element, value)).toThrow();
    }
  });
});
