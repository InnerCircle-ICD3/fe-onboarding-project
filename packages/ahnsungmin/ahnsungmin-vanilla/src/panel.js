import { currentMoney, updateMoney, addLog } from './store.js';

// 조작 패널 관련 코드 
document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('panel-input');
    const insertButton = document.getElementById('panel-insert-btn');
    const returnButton = document.getElementById('panel-return-btn');

    // 1. [투입] 버튼
    const handleInsert = () => {
        const amount = inputElement.valueAsNumber || 0;
        if (amount > 0) {
            updateMoney(currentMoney + amount);
            inputElement.value = '';
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleInsert();
        }
    };

    // 2. [반환] 버튼
    const handleReturn = () => {
        if (currentMoney > 0) {
            addLog(`${currentMoney.toLocaleString('ko-KR')}원을 반환합니다.`);
            updateMoney(0);
        }
    };
    
    // 입력창 이벤트 처리
    function handleInput(e) {
        // 숫자만 입력 가능하도록 필터링
        let value = e.target.value.replace(/[^0-9]/g, '');
        
        // 7자리로 제한
        if (value.length > 7) {
            value = value.slice(0, 7);
        }
        
        e.target.value = value;
    }

    // 이벤트 리스너 등록
    insertButton.addEventListener('click', handleInsert);
    returnButton.addEventListener('click', handleReturn);
    inputElement.addEventListener('keypress', handleKeyPress);
    inputElement.addEventListener('input', handleInput);
}); 