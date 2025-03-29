import { act, renderHook } from "@testing-library/react";
import useLogList from ".";

describe("useLogList 테스트", () => {
  it("Log List 값 출력", () => {
    const { result } = renderHook(() => useLogList());

    expect(result.current.logList).toEqual([]);
  });

  it("Log List 값 추가", () => {
    const { result } = renderHook(() => useLogList());

    act(() => result.current.addLog("Test Log"));

    expect(result.current.logList).toEqual(["Test Log"]);
  });
});
