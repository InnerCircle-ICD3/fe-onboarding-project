import numberWithCommas from ".";

describe("numberWithCommas 테스트", () => {
    it("numberWithCommas에 전달된 1000이 1,000으로 반환된다.", () => {
        expect(numberWithCommas(1000)).toBe("1,000");
    });
});
