import { describe, expect, it } from "vitest";
import useTotalPrice from ".";

describe("useTotalPrice 테스트", () => {
    it("Total Price 값 출력", () => {
        const {totalPrice} = useTotalPrice();

        expect(totalPrice).toBe(0);
    });

    it("Total Price 값 증가: 1000", () => {
        const {totalPrice, increaseTotalPrice} = useTotalPrice();

        increaseTotalPrice(1000);

        expect(totalPrice).toBe(1000);
    });

    it("Total Price 값 감소: 500", () => {
        const {totalPrice, decreaseTotalPrice} = useTotalPrice();

        decreaseTotalPrice(500);

        expect(totalPrice).toBe(-500);
    });

    it("Total Price 값 초기화", () => {
        const {totalPrice, increaseTotalPrice, resetTotalPrice} = useTotalPrice();

        increaseTotalPrice(1000);
        resetTotalPrice();

        expect(totalPrice).toBe(0);
    });
});