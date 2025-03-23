// 자판기의 상태 관리
export let currentMoney = 0;  // 현재 자판기에 남아있는 잔액
let logs = [];

// 잔액 업데이트
export function updateMoney(newAmount) {
    const difference = newAmount - currentMoney;
    if (difference > 0) {
        addLog(`${difference}원을 투입했습니다.`);
    }
    
    currentMoney = newAmount;
    updateMoneyDisplay(newAmount);
}

// 화면에 표시하는 금액 (돈 있는 상태에서는 잔액을 띄우지만, 돈 없는 상태로 음료수를 누르면 잔액 대신 음료수의 가격을 임시로 표시함)
export function updateMoneyDisplay(newAmount) {
    const displayElement = document.querySelector('.machine-money');
    displayElement.textContent = newAmount.toLocaleString();
}

// 로그 추가
export function addLog(message) {
    const logSection = document.querySelector('.log-section');
    const p = document.createElement('p');
    
    logs.push(message);
    p.textContent = `${logs.length}. ${message}`;
    logSection.appendChild(p);
}

// 반환 버튼 클릭
export function returnMoney() {
    if (currentMoney > 0) {
        addLog(`${currentMoney}원을 반환합니다.`);
        updateMoney(0);
    }
} 