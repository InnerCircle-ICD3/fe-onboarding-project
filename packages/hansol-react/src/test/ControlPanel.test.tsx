import { render, screen } from '@testing-library/react';
import ControlPanel from '../components/ControlPanel';
import { describe, expect, it } from 'vitest';

describe('ControlPanel', () => {
  it('컨트롤 패널 영역의 컨테이너가 렌더링된다.', () => {
    render(<ControlPanel />);
    expect(screen.getByTestId('control-panel-container')).toBeInTheDocument();
  });
  it('i잔액 입력과 버튼들을 감싸는 input-group 영역이 렌더링된다.', () => {
    render(<ControlPanel />);
    expect(screen.getByTestId('input-group')).toBeInTheDocument();
  });
  it('잔액 입력 영역이 렌더링된다.', () => {
    render(<ControlPanel />);
    expect(screen.getByTestId('control-input')).toBeInTheDocument();
  });
  it('투입 버튼 영역이 렌더링된다.', () => {
    render(<ControlPanel />);
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
  });
  it('반환 버튼 영역이 렌더링된다.', () => {
    render(<ControlPanel />);
    expect(screen.getByTestId('refund-button')).toBeInTheDocument();
  });
  it('에러 메세지 영역이 렌더링된다.', () => {
    render(<ControlPanel />);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
  it('로그 창 영역이 렌더링된다.', () => {
    render(<ControlPanel />);
    expect(screen.getByTestId('log-panel')).toBeInTheDocument();
  });
});