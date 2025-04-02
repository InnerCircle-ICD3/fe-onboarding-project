import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: center;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
`;

export const commonBorderStyle = css`
  border-radius: 10px;
  border: 1px solid #000;
`;