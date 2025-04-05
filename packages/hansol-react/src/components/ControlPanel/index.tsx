import { useState } from "react";
import { ControlButton, ControlInput, ControlPanelContainer, ErrorMessage, InputGroup, LogPanel } from "./ControlPanel.styles";

const ControlPanel = () => {
  const [isError, setIsError] = useState(false);

  return (
    <ControlPanelContainer data-testid="control-panel-container">
      <InputGroup data-testid="input-group">
        <ControlInput data-testid="control-input" />
        <ControlButton data-testid="add-button" >투입</ControlButton>
        <ControlButton data-testid="refund-button" >반환</ControlButton>
      </InputGroup>

      <ErrorMessage data-testid="error-message" visible={isError}>양수만 입력해주세요</ErrorMessage>

      <LogPanel data-testid="log-panel"></LogPanel>
    </ControlPanelContainer>
  );
}

export default ControlPanel;