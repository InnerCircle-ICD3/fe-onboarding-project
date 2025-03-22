export const ControlPanel = () => {
  return `
    <div class="control-panel">
      <div class="control-panel-top">
        <div class="input-display">3,000</div>
        <div class="control-buttons">
          <button class="control-btn">투입</button>
          <button class="control-btn">반환</button>
        </div>
      </div>
      <ol class="transaction-history">
        <li>2000원을 투입했습니다.</li>
        <li>오렌지쥬스를 구매했습니다.</li>
        <li>200원을 반환합니다.</li>
      </ol>
    </div>
  `;
};
