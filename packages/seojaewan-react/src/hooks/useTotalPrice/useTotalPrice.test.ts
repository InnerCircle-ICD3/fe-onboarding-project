import useTotalPrice from ".";
import { act, renderHook } from "@testing-library/react";

describe("useTotalPrice 테스트", () => {
  it("초기 totalPrice 값인 0이 반환된다.", () => {
    const { result } = renderHook(() => useTotalPrice());

    expect(result.current.totalPrice).toBe(0);
  });

  it("increaseTotalPrice()에 전달된 1000만큼 totalPrice 값이 증가한다.", () => {
    const { result } = renderHook(() => useTotalPrice());

    act(() => result.current.increaseTotalPrice(1000));
    expect(result.current.totalPrice).toBe(1000);
  });

  it("increaseTotalPrice()에 숫자값이 아닌 'test' 문자열이 전달되면 totalPrice 값이 증가하지 않고 오류가 발생한다.", () => {
    const { result } = renderHook(() => useTotalPrice());
    const prevTotalPrice = result.current.totalPrice;

    expect(() => {
      act(() => result.current.increaseTotalPrice("test"));
    }).toThrow("increaseTotalPrice()에 전달된 값은 숫자여야 합니다.");
    expect(result.current.totalPrice).toBe(prevTotalPrice);
  });

  it("decreaseTotalPrice()에 전달된 500만큼 totalPrice 값이 감소한다.", () => {
    const { result } = renderHook(() => useTotalPrice());

    act(() => result.current.decreaseTotalPrice(500));
    expect(result.current.totalPrice).toBe(-500);
  });

  it("decreaseTotalPrice()에 숫자값이 아닌 'test' 문자열이 전달되면 totalPrice 값이 감소하지 않고 오류가 발생한다.", () => {
    const { result } = renderHook(() => useTotalPrice());
    const prevTotalPrice = result.current.totalPrice;

    expect(() => {
      act(() => result.current.decreaseTotalPrice("test"));
    }).toThrow("decreaseTotalPrice()에 전달된 값은 숫자여야 합니다.");
    expect(result.current.totalPrice).toBe(prevTotalPrice);
  });

  it("increaseTotalPrice()로 1000 증가한 totalPrice를 resetTotalPrice로 0으로 초기화된다.", () => {
    const { result } = renderHook(() => useTotalPrice());

    act(() => result.current.increaseTotalPrice(1000));
    act(() => result.current.resetTotalPrice());
    expect(result.current.totalPrice).toBe(0);
  });
});
