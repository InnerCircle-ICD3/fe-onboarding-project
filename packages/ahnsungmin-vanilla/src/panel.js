// machine.js에서 export한 currentMoney 변수를 import
import { currentMoney, updateMoney, returnMoney } from './store.js';

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

    insertButton.addEventListener('click', insertMoney);
    inputElement.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            insertMoney();
        }
    });

    // 2. [반환] 버튼
    returnButton.addEventListener('click', () => {
        returnMoney();
    });
}); 