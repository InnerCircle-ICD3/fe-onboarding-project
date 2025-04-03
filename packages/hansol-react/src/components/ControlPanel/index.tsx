import { useState } from "react";
import { ControlButton, ControlInput, ControlPanelContainer, ErrorMessage, InputGroup, LogPanel } from "./ControlPanel.styles";

const ControlPanel = () => {
  const [isError, setIsError] = useState(false);
  
  return (
    <ControlPanelContainer>
      <InputGroup>
        <ControlInput/>
        <ControlButton>투입</ControlButton>
        <ControlButton>반환</ControlButton>
      </InputGroup>

      <ErrorMessage visible={isError}>양수만 입력해주세요</ErrorMessage>

      <LogPanel/>
    </ControlPanelContainer>
  );
}

export default ControlPanel;