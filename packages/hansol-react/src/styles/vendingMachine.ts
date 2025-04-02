import styled from "styled-components";
import { commonBorderStyle } from "./common";

export const VendingMachine = styled.section`
  ${commonBorderStyle}
  background: repeating-linear-gradient(-45deg, #aee1ff 0px, #aee1ff 0.1px, #fff 1px, #fff 2px);
  flex: 1.5;
  padding: 20px;
  height: auto;
  max-width: 100%;
  display: flex;
  flex-direction: column;
`;

export const VendingMachineDisplay = styled.div`
  ${commonBorderStyle}
  background: #fff;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  padding: 20px;
  margin-bottom: 20px;
  flex-shrink: 0;
`;

export const ProductGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  flex-grow: 1;
`;

export const ProductButton = styled.button`
  ${commonBorderStyle}
  background: #A5D8FF;
  padding: 10px;
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: #74C0FC;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background: #4dabf7;
    transform: translateY(0);
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

export const ProductName = styled.span`
  display: block;
  font-size: 1rem;
`;

export const ProductPrice = styled.span`
  display: block;
  font-size: 0.8rem;
  margin-top: 4px;
`;