import { act, renderHook } from "@testing-library/react";
import useLogList from ".";

const MESSAGE = "Test Log";
const MESSAGE_LIST = ["Test Log1", "Test Log 2"];

describe("useLogList 테스트", () => {
  it("초기 logList 값인 [](빈 배열)이 반환된다.", () => {
    const { result } = renderHook(() => useLogList());

    expect(result.current.logList).toEqual([]);
  });

  it("addLog()에 전달된 'Test Log'가 logList에 추가된다.", () => {
    const { result } = renderHook(() => useLogList());

    act(() => result.current.addLog(MESSAGE));
    expect(result.current.logList[0].message).toEqual(MESSAGE);
  });

  // boolean을 대표적으로 테스트 케이스로 작성했는데, number, object ... 다른 타입들도 다 테스트해야 할까?
  it("addLog()에 전달된 값이 문자열이 아닌 다른 타입 'boolean' 타입일 때 오류가 발생한다.", () => {
    const { result } = renderHook(() => useLogList());

    expect(() => {
      act(() => result.current.addLog(true));
    }).toThrow("addLog()에 전달된 값은 문자열이어야 합니다.");
  });

  it("addLog()로 로그가 추가되면 logList들의 ID가 증가한다.", () => {
    const { result } = renderHook(() => useLogList());

    MESSAGE_LIST.forEach((log) => {
      act(() => result.current.addLog(log));
    });

    const ids = result.current.logList.map((log) => log.id);

    expect(ids).toEqual([1, 2]);
  });
});
