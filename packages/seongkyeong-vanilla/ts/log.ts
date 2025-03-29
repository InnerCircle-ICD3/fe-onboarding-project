export enum LogType {
    CASH_PUT, CASH_RETURN, BUY
}

interface LogInfo {
    type: LogType;
    amount?: number;
    menuName?: string;
}

const $logBox = document.querySelector(".logging-box textarea");

window.addEventListener("logEvent", (e: CustomEventInit<LogInfo>) => {
    if (!e.detail) return;

    const log = createLog(e.detail);
    writeLog(log);
    scrollDown();
});

const createLog = (logInfo: LogInfo) => {
    let log = "";

    switch (logInfo.type) {
        case LogType.CASH_PUT:
            log = `${logInfo.amount}원을 투입했습니다.`;
            break;
        case LogType.CASH_RETURN:
            log = `${logInfo.amount}원을 반환합니다.`;
            break;
        case LogType.BUY:
            log = `${logInfo.menuName}을(를) 구매했습니다.`;
            break;
    }

    return log;
}

const writeLog = (line: string) => {
    if (!($logBox instanceof HTMLTextAreaElement)) return;
    $logBox.value = `${$logBox.value}${$logBox.value === "" ? "" : "\n"}${line}`
}

const scrollDown = () => {
    if (!($logBox instanceof HTMLTextAreaElement)) return;
    $logBox.scrollTop = $logBox.scrollHeight;
}

export const publishLogEvent = (logInfo: LogInfo) => {
    const logEvent = new CustomEvent("logEvent", {
        detail: {
            type: logInfo.type,
            amount: logInfo.amount,
            menuName: logInfo.menuName
        }
    });

    window.dispatchEvent(logEvent);
}