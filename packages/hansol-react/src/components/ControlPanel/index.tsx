import { useState } from "react";
import { ControlButton, ControlInput, ControlPanelContainer, ErrorMessage, InputGroup, LogMessage, LogPanel } from "./ControlPanel.styles";
import { formatCurrencyKRW, getInputNumberValue } from "../../utils/common";
import { useBalanceDispatch, useBalanceState } from "../../store/balance/BalanceContext";
import { useLogMessageDispatch, useLogMessageState } from "../../store/logMessage/LogMessageContext";

const ControlPanel = () => {
  const [isError, setIsError] = useState(false);
  const [inputValue, setInputValue] = useState(0);

  const balanceState = useBalanceState();
  const balanceDispatch = useBalanceDispatch();
  const { balance } = balanceState;

  const LogMessageState = useLogMessageState();
  const logMessageDispatch = useLogMessageDispatch();
  const { logMessages } = LogMessageState;
  
  const handleInputChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = getInputNumberValue(target);

    if(target.value === '') {
      setInputValue(0);
      setIsError(false);
      return;
    }
  
    if(!value || value <= 0) {
      setIsError(true);
      target.value = '';
    } else {
      setIsError(false);
      setInputValue(value);
      target.value = formatCurrencyKRW(value);
    }
  };

  const handleAddButton = () => {
    if (inputValue <= 0) {
      setIsError(true);
      return;
    }
    balanceDispatch({ type: 'ADD_BALANCE', payload: inputValue });
    logMessageDispatch({ type: 'ADD_LOG_MESSAGE', payload: `${formatCurrencyKRW(inputValue)}원을 투입했습니다.` });
    setInputValue(0);
  }

  const handleReturnButton = () => {
    logMessageDispatch({ type: 'ADD_LOG_MESSAGE', payload: `${formatCurrencyKRW(balance)}원이 반환되었습니다.` });
    balanceDispatch({ type: 'RETURN_BALANCE' });
  }
  
  return (
    <ControlPanelContainer data-testid="control-panel-container">
      <InputGroup data-testid="input-group">
        <ControlInput data-testid="control-input" value={inputValue === 0 ? 0 : formatCurrencyKRW(inputValue)} onChange={(event) => handleInputChange(event)}/>
        <ControlButton data-testid="add-button" onClick={handleAddButton}>투입</ControlButton>
        <ControlButton data-testid="refund-button" onClick={handleReturnButton}>반환</ControlButton>
      </InputGroup>

      <ErrorMessage data-testid="error-message" visible={isError}>양수만 입력해주세요</ErrorMessage>

      <LogPanel data-testid="log-panel">
        {logMessages.map((log, idx) => (
          <li key={idx}>
            <LogMessage>{log}</LogMessage>
          </li>
        ))}
      </LogPanel>
    </ControlPanelContainer>
  );
}

export default ControlPanel;