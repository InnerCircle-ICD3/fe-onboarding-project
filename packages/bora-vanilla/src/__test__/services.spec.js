import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createVendingMachineService } from '../js/services';
import { MAX_AMOUNT } from '../js/constants';

describe('VendingMachineService', () => {
  let mockStore;
  let vendingMachineService;

  beforeEach(() => {
    mockStore = {
      incrementBalance: vi.fn(),
      decrementBalance: vi.fn(),
      resetBalance: vi.fn(),
      getBalance: vi.fn(),
      getProductById: vi.fn(),
    };
    vendingMachineService = createVendingMachineService(mockStore);
  });

  // 상품 투입 테스트
  describe('insertMoney', () => {
    it('투입한 금액만큼 금액이 반환되고 성공 응답을 반환해야 한다.', () => {
      const amount = 3000;
      const updatedBalance = 3000;

      mockStore.incrementBalance.mockReturnValue(updatedBalance);

      const result = vendingMachineService.insertMoney(amount);

      expect(mockStore.incrementBalance).toHaveBeenCalledWith(amount);
      expect(result).toEqual({
        success: true,
        amount,
        updatedBalance,
      });
    });

    it('금액이 양수가 아니라면 에러를 반환해야 한다.', () => {
      const testCases = [
        { desc: 'NaN 값', input: Number.NaN },
        { desc: '0 값', input: 0 },
        { desc: '음수 값', input: -1000 },
      ];

      for (const { desc, input } of testCases) {
        console.log(`테스트 케이스: ${desc}`);

        const result = vendingMachineService.insertMoney(input);

        expect(mockStore.incrementBalance).not.toHaveBeenCalled();
        expect(result).toEqual({
          success: false,
          errorCode: 'INVALID_AMOUNT',
        });

        mockStore.incrementBalance.mockClear();
      }
    });

    it('최대 금액 제한을 초과하면 에러를 반환해야 한다', () => {
      const amount = MAX_AMOUNT + 1;

      const result = vendingMachineService.insertMoney(amount);

      expect(mockStore.incrementBalance).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: false,
        errorCode: 'EXCEED_MAX_AMOUNT',
      });
    });
  });
});
