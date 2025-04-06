import { currentMoney, updateMoney, addLog } from './store.js';

// 조작 패널 관련 코드 
document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('panel-input');
    const insertButton = document.getElementById('panel-insert-btn');
    const returnButton = document.getElementById('panel-return-btn');

    inputElement.addEventListener('input', (e) => {
        // 숫자만 입력 가능하도록 필터링
        let value = e.target.value.replace(/[^0-9]/g, '');
        
        // 7자리로 제한
        if (value.length > 7) {
            value = value.slice(0, 7);
        }
        
        e.target.value = value;
    });

    // 1. [투입] 버튼
    const insertMoney = () => {
        const amount = inputElement.valueAsNumber || 0;
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
            addLog(`${currentMoney.toLocaleString('ko-KR')}원을 반환합니다.`);
            updateMoney(0);
        }
    };

    // 이벤트 리스너 등록
    insertButton.addEventListener('click', insertMoney);
    inputElement.addEventListener('keypress', handleEnterKey);
    returnButton.addEventListener('click', returnMoney);
}); 