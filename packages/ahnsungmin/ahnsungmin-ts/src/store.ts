// 자판기의 상태 관리
export let currentMoney = 0;  // 현재 자판기에 남아있는 잔액
let logs: string[] = [];

// 잔액 업데이트
export function updateMoney(newAmount: number): void {
    const difference = newAmount - currentMoney;
    if (difference > 0) {
        addLog(`${difference.toLocaleString('ko-KR')}원을 투입했습니다.`);
    }
    
    currentMoney = newAmount;
    updateMoneyDisplay(currentMoney);
}

// 화면에 표시하는 금액 (돈 있는 상태에서는 잔액을 띄우지만, 돈 없는 상태로 음료수를 누르면 잔액 대신 음료수의 가격을 임시로 표시함)
export function updateMoneyDisplay(newAmount: number): void {
    const displayElement = document.querySelector('.machine-money');
    if (!displayElement) return;
    displayElement.textContent = newAmount.toLocaleString('ko-KR');
}

// 로그 추가
export function addLog(message: string): void {
    const logSection = document.querySelector('.log-section');
    if (!logSection) return;
    
    const p = document.createElement('p');
    logs.push(message);
    p.textContent = `${logs.length}. ${message}`;
    logSection.appendChild(p);

    // 스크롤을 맨 아래로 이동
    logSection.scrollTop = logSection.scrollHeight;
}

// 테스트 코드를 위한 초기화 함수
export function initializeStore(): void {
    currentMoney = 0;
    logs = [];
}