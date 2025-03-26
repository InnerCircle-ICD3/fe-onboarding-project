import { formatCurrencyAsLocaleString } from "./utils.js";

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
