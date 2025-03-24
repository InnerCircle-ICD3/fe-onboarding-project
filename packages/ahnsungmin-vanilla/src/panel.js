// machine.js에서 export한 currentMoney 변수를 import
import { currentMoney, updateMoney, addLog } from './store.js';

// 조작 패널 관련 코드 
document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('panel-input');
    const insertButton = document.getElementById('panel-insert-btn');
    const returnButton = document.getElementById('panel-return-btn');

    // 1. [투입] 버튼
    const insertMoney = () => {
        const amount = parseInt(inputElement.value) || 0;
        if (amount > 0) {
            updateMoney(currentMoney + amount);
            inputElement.value = '';
        }
    };

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            insertMoney();
        }
    };

    // 2. [반환] 버튼
    const returnMoney = () => {
        if (currentMoney > 0) {
            addLog(`${currentMoney}원을 반환합니다.`);
            updateMoney(0);
        }
    };

    // 이벤트 리스너 등록
    insertButton.addEventListener('click', insertMoney);
    inputElement.addEventListener('keypress', handleEnterKey);
    returnButton.addEventListener('click', returnMoney);
}); 