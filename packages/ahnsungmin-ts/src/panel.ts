import { updateMoney, currentMoney, addLog } from './store';

// 조작 패널 관련 코드
document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.getElementById('panel-input');
    const insertButton = document.getElementById('panel-insert-btn');
    const returnButton = document.getElementById('panel-return-btn');
    
    if (!inputElement || !insertButton || !returnButton) {
        console.error('필요한 요소를 찾을 수 없습니다.');
        return;
    }
    
    if (!(inputElement instanceof HTMLInputElement) || 
        !(insertButton instanceof HTMLButtonElement) || 
        !(returnButton instanceof HTMLButtonElement)) {
        console.error('요소의 타입이 올바르지 않습니다.');
        return;
    }
    
    // 1. [투입] 버튼 클릭 시 금액 투입
    const typedInputElement: HTMLInputElement = inputElement;  // 타입 가드 후에 변수를 다시 선언하여 TypeScript가 타입을 인식하도록 함
    function handleInsert(): void {
        const amount = parseInt(typedInputElement.value);
        if (isNaN(amount) || amount <= 0) {
            alert('올바른 금액을 입력해주세요.');
            return;
        }
        updateMoney(amount);
        typedInputElement.value = '';
    }
    
    // 2. [반환] 버튼 클릭 시 금액 반환
    function handleReturn(): void {
        if (currentMoney > 0) {
            addLog(`${currentMoney.toLocaleString('ko-KR')}원을 반환했습니다.`);
            updateMoney(0);
        }
    }

    // 입력창 이벤트 처리
    function handleKeyPress(e: KeyboardEvent): void {
        if (e.key === 'Enter') {
            handleInsert();
        }
    }

    // 이벤트 리스너 등록
    insertButton.addEventListener('click', handleInsert);
    returnButton.addEventListener('click', handleReturn);
    inputElement.addEventListener('keypress', handleKeyPress);
}); 