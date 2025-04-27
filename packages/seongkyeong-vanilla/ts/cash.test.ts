import { describe, it, beforeEach, vi, expect } from "vitest";
import { LogType, publishLogEvent } from "./log";

const $: Record<string, HTMLElement> = {};

describe("Cash", () => {
    vi.mock("./log", () => {
        return {
            publishLogEvent: vi.fn(),
            LogType: {
                CASH_PUT: "CASH_PUT",
                CASH_RETURN: "CASH_RETURN",
            },
        };
    });

    beforeEach(async () => {
        vi.clearAllMocks();
        vi.resetModules();

        document.body.innerHTML = `
            <input type="number" class="cash" />
            <div class="balance">0</div>
            <button class="put-btn"></button>
            <button class="rtn-btn"></button>
            <div class="warning-box control"></div>
        `;

        $.cashInput = document.querySelector("input[type=number].cash") as HTMLInputElement;
        $.balanceOutput = document.querySelector(".balance") as HTMLDivElement;
        $.putButton = document.querySelector(".put-btn") as HTMLButtonElement;
        $.returnButton = document.querySelector(".rtn-btn") as HTMLButtonElement;
        $.warningContent = document.querySelector(".warning-box.control") as HTMLDivElement;

        await import("./cash");
    });

    describe("투입 버튼을 클릭했을 때", () => {
        describe("금액칸에 양수가 입력되어 있다면", () => {            
            it("잔액이 금액만큼 늘어나고 input은 초기화된다", () => {
                ($.cashInput as HTMLInputElement).value = "1000";
                $.putButton.click();

                expect($.balanceOutput.textContent).toBe("1,000");

                ($.cashInput as HTMLInputElement).value = "1000";
                $.putButton.click();

                expect($.balanceOutput.textContent).toBe("2,000");
                expect(($.cashInput as HTMLInputElement).value).toBe("");
            });

            it("금액칸 밑에 있는 경고 메시지가 사라진다", () => {
                ($.cashInput as HTMLInputElement).value = "0";
                $.putButton.click();

                expect($.warningContent.textContent).toBe("투입 금액은 0 이하일 수 없습니다.");
                
                ($.cashInput as HTMLInputElement).value = "1000";
                $.putButton.click();

                expect($.warningContent.textContent).toBe("");
            });

            it("로그 이벤트를 발행한다", () => {
                ($.cashInput as HTMLInputElement).value = "1000";
                $.putButton.click();

                expect(publishLogEvent).toHaveBeenCalledWith({
                    type: LogType.CASH_PUT,
                    amount: 1000,
                });
            });
        });

        describe("금액칸에 양수가 아닌 값이 입력되어 있다면", () => {
            it("경고 메시지를 표시하고, 로그 이벤트를 발행시키지 않는다", () => {
                const testCases = [0, -1, -100, Number.NaN, "abc"];
    
                for (const cash of testCases) {
                    ($.cashInput as HTMLInputElement).value = cash.toString();
                    $.putButton.click();
    
                    expect($.warningContent.textContent).toBe("투입 금액은 0 이하일 수 없습니다.");
                    expect(publishLogEvent).not.toHaveBeenCalled();
                    expect($.balanceOutput.textContent).toBe("0");
                }
            });
        });
    })

    describe("반환 버튼을 클릭했을 때", () => {
        describe("반환할 금액이 있다면", () => {
            it("input에 잔액이 입력되고 잔액은 0으로 초기화된다", () => {
                ($.cashInput as HTMLInputElement).value = "1000";
                $.putButton.click();

                $.returnButton.click();

                expect(($.cashInput as HTMLInputElement).value).toBe("1000");
                expect($.balanceOutput.textContent).toBe("0");
            });

            it("금액칸 밑에 있는 경고 메시지가 사라진다", () => {
                ($.cashInput as HTMLInputElement).value = "1000";
                $.putButton.click();

                $.returnButton.click();

                expect($.warningContent?.textContent).toBe("");
            });

            it("로그 이벤트를 발행시킨다", () => {
                ($.cashInput as HTMLInputElement).value = "1000";
                $.putButton.click();

                $.returnButton.click();
                
                expect(publishLogEvent).toHaveBeenCalledWith({
                    type: LogType.CASH_RETURN,
                    amount: 1000,
                });
            });
        });

        describe("반환할 금액이 없다면", () => {
            it("경고 메시지를 표시하고, 로그 이벤트를 발행시키지 않는다", () => {
                $.returnButton.click();

                expect($.warningContent.textContent).toBe("반환할 금액이 없습니다.");
                expect(publishLogEvent).not.toHaveBeenCalled();
            });
        });
    });
});
