import numberWithCommas from ".";

describe("numberWithCommas 테스트", () => {
    it("숫자에 콤마 추가", () => {
        expect(numberWithCommas(1000)).toBe("1,000");
    });
});