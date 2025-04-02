import styled from "styled-components";
import { commonBorderStyle } from "./common";

export const ControlPanel = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: 5px;
  margin: 20px 0 20px 0;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const ControlInput = styled.input`
  ${commonBorderStyle}
  padding: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  box-sizing: border-box;
`;

export const ControlButton = styled.button`
${commonBorderStyle}
  padding: 8px 12px;
  background: #A5D8FF;
  cursor: pointer;
  white-space: nowrap;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8em;
  visibility: visible;
  text-align: center;
  width: 100%;
`;

export const LogPanel = styled.ul`
  ${commonBorderStyle}
  list-style: none;
  margin: 0;
  background: #fff;
  overflow-y: auto;
  padding: 10px;
  font-family: monospace;
  font-size: 0.9rem;
  height: 300px;
`;

export const LogMessage = styled.span`
  font-weight: bold;
`;