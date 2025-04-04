import { screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ControlPanel from '../components/ControlPanel';
import { renderWithProviders } from './renderWithProviders';


describe('ControlPanel', () => {
  it('컨트롤 패널 영역의 컨테이너가 렌더링된다.', () => {
    renderWithProviders(<ControlPanel />);
    expect(screen.getByTestId('control-panel-container')).toBeInTheDocument();
  });
  it('잔액 입력과 버튼들을 감싸는 input-group 영역이 렌더링된다.', () => {
    renderWithProviders(<ControlPanel />);
    expect(screen.getByTestId('input-group')).toBeInTheDocument();
  });
  it('잔액 입력 영역이 렌더링된다.', () => {
    renderWithProviders(<ControlPanel />);
    expect(screen.getByTestId('control-input')).toBeInTheDocument();
  });
  it('투입 버튼 영역이 렌더링된다.', () => {
    renderWithProviders(<ControlPanel />);
    expect(screen.getByTestId('add-button')).toBeInTheDocument();
  });
  it('반환 버튼 영역이 렌더링된다.', () => {
    renderWithProviders(<ControlPanel />);
    expect(screen.getByTestId('refund-button')).toBeInTheDocument();
  });
  it('에러 메세지 영역이 렌더링된다.', () => {
    renderWithProviders(<ControlPanel />);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });
  it('로그 창 영역이 렌더링된다.', () => {
    renderWithProviders(<ControlPanel />);
    expect(screen.getByTestId('log-panel')).toBeInTheDocument();
  });


  it('금액을 양수를 입력하면 에러 메시지가 보이지 않는다.', () => {
    renderWithProviders(<ControlPanel />);
    const input = screen.getByTestId('control-input');

    fireEvent.change(input, { target: { value: '1000' } });

    expect(screen.getByTestId('error-message')).not.toBeVisible();
  });

  it.each(['-500', '한글', 'ABC'])(
    '잘못된 입력 "%s"은(는) 에러 메시지를 표시한다.',
    (invalidInput) => {
      renderWithProviders(<ControlPanel />);
      const input = screen.getByTestId('control-input');

      fireEvent.change(input, { target: { value: invalidInput } });

      const errorMessage = screen.getByTestId('error-message');
      expect(errorMessage).toBeVisible();
      expect(errorMessage).toHaveTextContent('양수만 입력해주세요');
    }
  );

  it('투입 버튼 클릭 시 balance와 로그 메시지 dispatch가 발생한다.', () => {
    const mockBalanceDispatch = vi.fn();
    const mockLogDispatch = vi.fn();

    renderWithProviders(<ControlPanel />, {
      balanceDispatch: mockBalanceDispatch,
      logDispatch: mockLogDispatch,
    });

    const input = screen.getByTestId('control-input');
    fireEvent.change(input, { target: { value: '1000' } });

    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);

    expect(mockBalanceDispatch).toHaveBeenCalledWith({
      type: 'ADD_BALANCE',
      payload: 1000,
    });

    expect(mockLogDispatch).toHaveBeenCalledWith({
      type: 'ADD_LOG_MESSAGE',
      payload: '1,000원을 투입했습니다.',
    });
  });

  it('반환 버튼 클릭 시 balance 초기화와 로그 메시지 dispatch가 발생한다.', () => {
    const mockBalanceDispatch = vi.fn();
    const mockLogDispatch = vi.fn();

    renderWithProviders(<ControlPanel />, {
      balanceState: { balance: 3000 },
      balanceDispatch: mockBalanceDispatch,
      logDispatch: mockLogDispatch,
    });

    const returnButton = screen.getByTestId('refund-button');
    fireEvent.click(returnButton);

    expect(mockBalanceDispatch).toHaveBeenCalledWith({
      type: 'RETURN_BALANCE',
    });

    expect(mockLogDispatch).toHaveBeenCalledWith({
      type: 'ADD_LOG_MESSAGE',
      payload: '3,000원이 반환되었습니다.',
    });
  });

  it('투입 후 input 창이 비워진다.', () => {
    renderWithProviders(<ControlPanel />);

    const input = screen.getByTestId('control-input');
    const addButton = screen.getByTestId('add-button');
    fireEvent.click(addButton);

    expect(input).toHaveValue('0');
  });
});