import { getNumericValue } from "./numberInput.js";
import { addLog } from "./logHandler.js";

const numberInput = document.querySelectorAll(".numberInput");
const buttonsContainer = document.querySelector(".buttons");
let total = 0;

const handleInsert = () => {
    const depositAmount = getNumericValue(numberInput[1]);
    if (!depositAmount) return;

    total += depositAmount;
    numberInput[0].value = total.toLocaleString("ko-KR");
    numberInput[1].value = ""; // 입력값 초기화

    addLog(`${depositAmount.toLocaleString("ko-KR")}원을 투입했습니다.`);
};

const handleRefund = () => {
    if (total === 0) return;
    
    addLog(`${total.toLocaleString("ko-KR")}원이 반환되었습니다.`);
    total = 0;
    numberInput[0].value = "0";
};

buttonsContainer.addEventListener("click", (event) => {
    if (event.target.id === "button-insert") {
        handleInsert();
    } else if (event.target.id === "button-refund") {
        handleRefund();
    }
});
