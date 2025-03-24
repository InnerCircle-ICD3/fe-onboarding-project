function handleAddMoney() {
  // 1. input 값 읽기
  const controlInput = document.querySelector('.control-input') as HTMLInputElement;
  // 2. 값이 유효한지 확인
  const inputValue = Number(controlInput?.value);
  if (inputValue >= 0) {

  }
  // 3. 금액 상태 업데이트
  // 4. 디스플레이 업데이트
  // 5. 로그 추가
}

function updateDisplay() {
  // 디스플레이 텍스트 변경
}

function addLogMessage(message: string) {
  // 로그 ul에 li 추가
}
