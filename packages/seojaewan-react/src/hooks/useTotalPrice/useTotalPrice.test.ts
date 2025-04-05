import useTotalPrice from ".";
import { act, renderHook } from "@testing-library/react";

describe("useTotalPrice 테스트", () => {
  it("Total Price 값 출력", () => {
    const { result } = renderHook(() => useTotalPrice());

    expect(result.current.totalPrice).toBe(0);
  });

  it("Total Price 값 증가: 1000", () => {
    const { result } = renderHook(() => useTotalPrice());

    act(() => result.current.increaseTotalPrice(1000));

    expect(result.current.totalPrice).toBe(1000);
  });

  it("Total Price 값 감소: 500", () => {
    const { result } = renderHook(() => useTotalPrice());

    act(() => result.current.decreaseTotalPrice(500));

    expect(result.current.totalPrice).toBe(-500);
  });

  it("Total Price 값 초기화", () => {
    const { result } = renderHook(() => useTotalPrice());

    act(() => result.current.increaseTotalPrice(1000));
    act(() => result.current.resetTotalPrice());

    expect(result.current.totalPrice).toBe(0);
  });
});
