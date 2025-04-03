import { beforeEach, describe, it, vi } from 'vitest';
import { createVendingMachineView } from '../js/view';
import { expect } from 'vitest';

describe('VendingMachineView', () => {
  let mockDomSelector;
  let mockProductButtonContainer;
  let mockVendingMachineBalance;
  let mockLogContainer;
  let mockMoneyAmountInput;
  let mockMoneyInsertForm;
  let mockMoneyReturnButton;
  let view;

  beforeEach(() => {
    mockProductButtonContainer = document.createElement('div');
    mockVendingMachineBalance = document.createElement('div');
    mockLogContainer = document.createElement('div');
    mockMoneyAmountInput = document.createElement('input');
    mockMoneyInsertForm = document.createElement('form');
    mockMoneyReturnButton = document.createElement('button');

    view = createVendingMachineView();
  });

  // 초기화
  it('초기화', () => {
    expect(view).toBeDefined();
  });

  // 렌더링
  describe('renderProducts', () => {
    it('상품 데이터를 기반으로 버튼을 렌더링해야 한다.', () => {
      const products = [
        { id: 1, name: '콜라', price: 1000 },
        { id: 2, name: '사이다', price: 1500 },
      ];

      view.renderProducts(products);

      expect(mockProductButtonContainer.children[0].dataset.id).toBe('1');
      expect(mockProductButtonContainer.children[0].textContent).toContain('콜라');
      expect(mockProductButtonContainer.children[0].textContent).toContain('1000원');

      expect(mockProductButtonContainer.children[1].dataset.id).toBe('2');
      expect(mockProductButtonContainer.children[1].textContent).toContain('사이다');
      expect(mockProductButtonContainer.children[1].textContent).toContain('1500원');
    });

    it('제품 갯수에 따라 빈 셀이 유동적으로 렌더링되어야 한다.', () => {
      const products1 = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: '상품',
        price: 1000,
      }));

      view.renderProducts(products1);

      expect(mockProductButtonContainer.children.length).toBe(12);
    });
  });

  // 잔액 표시
  describe('renderBalanceDisplay', () => {
    it('현재 잔액을 자판기 금액 표시창에 렌더링 해야 한다.', () => {
      const balance = 5000;
      view.renderBalanceDisplay(balance);
      expect(mockVendingMachineBalance.textContent).toBe('5,000원');
    });
  });

  // 로그 메시지
  describe('renderLogMessage', () => {
    it('로그 메세지가 성공적으로 렌더링 되어야 한다.', () => {
      const message = '테스트 메시지입니다.';
      view.renderLogMessage(message);
      expect(mockLogContainer.lastChild.textContent).toBe(message);
    });
  });

  // 금액 입력 필드
  describe('금액 입력 필드 관련 기능', () => {
    it('getMoneyInputValue는 입력 필드의 현재 값을 반환해야 한다', () => {
      mockMoneyAmountInput.value = '1000';
      expect(view.getMoneyInputValue()).toBe('1000');
    });

    it('setMoneyInputValue는 입력 필드의 값을 설정해야 한다', () => {
      view.setMoneyInputValue('2000');
      expect(mockMoneyAmountInput.value).toBe('2000');
    });

    it('clearMoneyInput은 입력 필드의 값을 비워야 한다', () => {
      mockMoneyAmountInput.value = '1000';
      view.clearMoneyInput();
      expect(mockMoneyAmountInput.value).toBe('');
    });
  });
});
