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

    mockDomSelector = {
      getProductButtonContainer: vi.fn(() => mockProductButtonContainer),
      getVendingMachineBalance: vi.fn(() => mockVendingMachineBalance),
      getLogContainer: vi.fn(() => mockLogContainer),
      getMoneyAmountInput: vi.fn(() => mockMoneyAmountInput),
      getMoneyInsertForm: vi.fn(() => mockMoneyInsertForm),
      getMoneyReturnButton: vi.fn(() => mockMoneyReturnButton),
    };

    view = createVendingMachineView(mockDomSelector);
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

  // 이벤트 핸들러
});
