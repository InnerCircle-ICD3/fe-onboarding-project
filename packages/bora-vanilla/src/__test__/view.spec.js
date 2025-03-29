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

  // 이벤트 핸들러

  it('');
});
