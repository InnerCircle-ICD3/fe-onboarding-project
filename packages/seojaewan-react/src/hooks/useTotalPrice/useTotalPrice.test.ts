import useTotalPrice from ".";
import {act, renderHook} from "@testing-library/react";

describe("useTotalPrice 테스트", () => {
    it("초기 totalPrice 값인 0이 반환된다.", () => {
        const {result} = renderHook(() => useTotalPrice());

        expect(result.current.totalPrice).toBe(0);
    });

    it("increaseTotalPrice에 전달된 1000만큼 totalPrice 값이 증가한다.", () => {
        const {result} = renderHook(() => useTotalPrice());

        act(() => result.current.increaseTotalPrice(1000));

        expect(result.current.totalPrice).toBe(1000);
    });

    it("decreaseTotalPrice에 전달된 500만큼 totalPrice 값이 감소한다.", () => {
        const {result} = renderHook(() => useTotalPrice());

        act(() => result.current.decreaseTotalPrice(500));

        expect(result.current.totalPrice).toBe(-500);
    });

    it("increaseTotalPrice로 1000 증가한 totalPrice를 resetTotalPrice로 0으로 초기화된다.", () => {
        const {result} = renderHook(() => useTotalPrice());

        act(() => result.current.increaseTotalPrice(1000));
        act(() => result.current.resetTotalPrice());

        expect(result.current.totalPrice).toBe(0);
    });
});
