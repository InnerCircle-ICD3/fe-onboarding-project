import numberWithCommas from ".";

describe("numberWithCommas 테스트", () => {
    it("numberWithCommas()에 전달된 1000이 1,000처럼 세 자리마다 쉼표를 추가한 문자열이 반환된다.", () => {
        expect(numberWithCommas(1000)).toBe("1,000");
    });
});
