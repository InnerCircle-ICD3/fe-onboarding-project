import {act, renderHook} from "@testing-library/react";
import useLogList from ".";

describe("useLogList 테스트", () => {
    it("초기 logList 값인 [](빈 배열)이 반환된다.", () => {
        const {result} = renderHook(() => useLogList());

        expect(result.current.logList).toEqual([]);
    });

    it("addLog()에 전달된 'Test Log'가 logList에 추가된다.", () => {
        const {result} = renderHook(() => useLogList());

        act(() => result.current.addLog("Test Log"));

        expect(result.current.logList[0].message).toEqual("Test Log");
    });
});
