import numberWithCommas from ".";

const NUMBER_PRICE = 1_000;
const STRING_PRICE = "1000";
const RESULT = "1,000";
const STRING_TEXT = "test";

describe("numberWithCommas 테스트", () => {
  it("numberWithCommas()에 전달된 1000이 1,000처럼 세 자리마다 쉼표를 추가한 문자열이 반환된다.", () => {
    expect(numberWithCommas(NUMBER_PRICE)).toBe(RESULT);
  });

  it("numberWithCommas()에 전달된 문자열 '1000'이 1,000처럼 세 자리마다 쉼표를 추가한 문자열이 반환된다.", () => {
    expect(numberWithCommas(STRING_PRICE)).toBe(RESULT);
  });

  it("numberWithCommas()에 숫자형이 아닌 'test'가 전달되면 오류가 발생한다.", () => {
    expect(() => {
      numberWithCommas(STRING_TEXT);
    }).toThrow(
      "numberWithCommas()에 전달된 값은 숫자 또는 문자열이어야 합니다."
    );
  });
});
