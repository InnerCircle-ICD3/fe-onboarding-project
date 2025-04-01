function MoneyFunctionContainer({
  moneyInput,
  onMoneyInputChange,
  onInsert,
  onReturn,
}) {
  return (
    <div>
      <input
        id="money-input"
        type="number"
        value={moneyInput}
        onChange={onMoneyInputChange}
        min={0}
        step={10}
      ></input>
      <button className="input-btn" onClick={onInsert}>
        투입
      </button>
      <button className="return-btn" onClick={onReturn}>
        반환
      </button>
    </div>
  );
}

export default MoneyFunctionContainer;
