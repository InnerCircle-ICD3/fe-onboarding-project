import { describe, it, beforeEach, expect, vi } from "vitest";
import { publishLogEvent, LogType } from "./log";

const document = globalThis.document as Document;
document.body.innerHTML = `
    <textarea class="logging-box"></textarea>
`;

const $logBox = document.querySelector<HTMLTextAreaElement>(".logging-box textarea");

describe("Log", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        if ($logBox) $logBox.value = "";
    });

    describe("로그 추가 이벤트가 발생하면", () => {
        publishLogEvent({ type: LogType.CASH_PUT, amount: 1000 });
        publishLogEvent({ type: LogType.CASH_RETURN, amount: 500 });
        publishLogEvent({ type: LogType.BUY, menuName: "콜라" });

        it("추가된 로그를 표시한다", () => {
            if ($logBox) {
                vi.waitFor(() => {
                    expect($logBox.value).toBe(
                        "1000원을 투입했습니다.\n500원을 반환합니다.\n콜라을(를) 구매했습니다."
                    );
                });
            }
        });

        it("스크롤을 아래로 내린다", () => {
            if ($logBox) {
                Object.defineProperty($logBox, "scrollHeight", { value: 100, writable: true });
                Object.defineProperty($logBox, "scrollTop", { value: 0, writable: true });

                vi.waitFor(() => {
                    expect($logBox.scrollTop).toBe($logBox.scrollHeight);
                });
            }
        });
    });
});