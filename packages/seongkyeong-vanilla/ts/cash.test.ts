import { describe, it, beforeEach, vi, expect } from "vitest";
import { LogType, publishLogEvent } from "./log";
import "./cash";

const document = globalThis.document as Document;
document.body.innerHTML = `
    <input type="number" class="cash" />
    <div class="balance">0</div>
    <button class="put-btn"></button>
    <button class="rtn-btn"></button>
    <div class="warning-box control"></div>
`;

const $cashInput = document.querySelector<HTMLInputElement>("input[type=number].cash");
const $balanceOutput = document.querySelector<HTMLDivElement>(".balance");
const $putButton = document.querySelector<HTMLButtonElement>(".put-btn");
const $returnButton = document.querySelector<HTMLButtonElement>(".rtn-btn");
const $warningContent = document.querySelector<HTMLDivElement>(".warning-box.control");

describe("Cash", () => {
    beforeEach(async () => {
        vi.clearAllMocks();
        if ($cashInput) $cashInput.value = "";
        if ($balanceOutput) $balanceOutput.innerText = "0";
        if ($warningContent) $warningContent.innerText = "";
    });

    describe("투입 버튼을 클릭했을 때", () => {
        describe("금액칸에 양수가 입력되어 있다면", async () => {
            if ($cashInput && $putButton && $balanceOutput) {
                $balanceOutput.innerText = "2,000";
                $cashInput.value = "1000";
                $cashInput.dispatchEvent(new Event("input", {bubbles: true}));
    
                $putButton.click();
                
                it("잔액이 금액만큼 늘어나고 input은 초기화된다", () => {
                    vi.waitFor(() => {
                        expect($balanceOutput.innerText).toBe("3,000");
                        expect($cashInput.value).toBe("");
                    });
                });
    
                it("금액칸 밑에 있는 경고 메시지가 사라진다", () => {
                    vi.waitFor(() => {
                        expect($warningContent?.innerText).toBe("");
                    });
                });
    
                it("로그 이벤트를 발행한다", () => {
                    vi.waitFor(() => {
                        expect(publishLogEvent).toHaveBeenCalledWith({
                            type: LogType.CASH_PUT,
                            amount: 3000,
                        });
                    });
                });
            }
        });

        describe("금액칸에 양수가 아닌 값이 입력되어 있다면", () => {
            it("경고 메시지를 표시하고, 로그 이벤트를 발행시키지 않는다", () => {
                const testCases = [0, -1, -100, Number.NaN, "abc"];
    
                for (const cash of testCases) {
                    if ($cashInput && $putButton) {
                        $cashInput.value = cash.toString();
                        $putButton.click();
    
                        vi.waitFor(() => {
                            expect($warningContent?.innerText).toBe("투입 금액은 0 이하일 수 없습니다.");
                            expect(publishLogEvent).not.toHaveBeenCalled();
                            expect($balanceOutput?.innerText).toBe("0");
                        });
                    }
                }
            });
        });
    })

    describe("반환 버튼을 클릭했을 때", () => {
        describe("반환할 금액이 있다면", () => {
            if ($balanceOutput && $returnButton && $cashInput) {
                $balanceOutput.innerText = "1,000";
                $returnButton.click();

                it("input에 잔액이 입력되고 잔액은 0으로 초기화된다", () => {
                    vi.waitFor(() => {
                        expect($cashInput.value).toBe("1000");
                        expect($balanceOutput.innerText).toBe("0");
                    });
                });

                it("input에 잔액이 입력되고 잔액은 0으로 초기화된다", () => {
                    vi.waitFor(() => {
                        expect($warningContent?.innerText).toBe("");
                    });
                });

                it("로그 이벤트를 발행시킨다", () => {
                    vi.waitFor(() => {
                        expect(publishLogEvent).toHaveBeenCalledWith({
                            type: LogType.CASH_RETURN,
                            amount: 1000,
                        });
                    });
                });
            }
        });

        describe("반환할 금액이 없다면", () => {
            it("경고 메시지를 표시하고, 로그 이벤트를 발행시키지 않는다", () => {
                if ($balanceOutput && $returnButton) {
                    $balanceOutput.innerText = "0";
                    $returnButton.click();

                    vi.waitFor(() => {
                        expect($warningContent?.innerText).toBe("반환할 금액이 없습니다.");
                        expect(publishLogEvent).not.toHaveBeenCalled();
                    });
                }
            });
        });
    });
});
