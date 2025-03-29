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

  // 상품 구매 테스트
  describe('buyProduct', () => {
    it('해당 상품을 구매하고 성공 응답을 반환해야 한다.', () => {
      const productId = 1;
      const product = {
        id: 1,
        name: '콜라',
        price: 1500,
        disabled: false,
      };
      const updatedBalance = 3000;

      mockStore.getProductById.mockReturnValue(product);
      mockStore.decrementBalance.mockReturnValue(updatedBalance);

      const result = vendingMachineService.buyProduct(productId);

      expect(mockStore.getProductById).toHaveBeenCalledWith(productId);
      expect(mockStore.decrementBalance).toHaveBeenCalledWith(product.price);
      expect(result).toEqual({
        success: true,
        product,
        updatedBalance,
      });
    });
  });

  // 잔돈 반환 테스트
  describe('returnMoney', () => {
    it('잔돈을 반환하고 성공 응답을 반환해야 한다.', () => {
      const currentBalance = 3000;
      const updatedBalance = 0;

      mockStore.getBalance.mockReturnValue(currentBalance);
      mockStore.resetBalance.mockReturnValue(updatedBalance);

      const result = vendingMachineService.returnMoney();

      expect(mockStore.getBalance).toHaveBeenCalled();
      expect(mockStore.resetBalance).toHaveBeenCalled();
      expect(result).toEqual({
        success: true,
        returnBalance: currentBalance,
        updatedBalance,
      });
    });

    it('잔돈이 없으면 에러를 반환해야 한다.', () => {
      mockStore.getBalance.mockReturnValue(0);

      const result = vendingMachineService.returnMoney();

      expect(mockStore.getBalance).toHaveBeenCalled();
      expect(mockStore.resetBalance).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: false,
        errorCode: 'NO_BALANCE_TO_RETURN',
      });
    });
  });

  // 상품 구매 검증 테스트
  describe('validatePurchase', () => {
    it('상품이 존재하지 않으면 에러를 반환해야 한다.', () => {
      mockStore.getProductById.mockReturnValue(null);

      const result = vendingMachineService.buyProduct(null);

      expect(mockStore.getProductById).toHaveBeenCalledWith(null);
      expect(mockStore.decrementBalance).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: false,
        errorCode: 'PRODUCT_NOT_FOUND',
        productPrice: 0,
      });
    });

    it('상품이 구매 불가능 상태면 에러를 반환해야 한다.', () => {
      const productId = 1;
      const product = {
        id: 1,
        name: '콜라',
        price: 1500,
        disabled: true,
      };

      mockStore.getProductById.mockReturnValue(product);
      const result = vendingMachineService.buyProduct(productId);

      expect(mockStore.getProductById).toHaveBeenCalledWith(productId);
      expect(result).toEqual({
        success: false,
        errorCode: 'PRODUCT_DISABLED',
        productPrice: 0,
      });
    });

    it('잔액이 부족하면 에러를 반환해야 한다.', () => {
      const productId = 1;
      const product = {
        id: 1,
        name: '콜라',
        price: 1500,
        disabled: false,
      };

      mockStore.getProductById.mockReturnValue(product);
      mockStore.getBalance.mockReturnValue(1000);

      const result = vendingMachineService.buyProduct(productId);

      expect(mockStore.getProductById).toHaveBeenCalledWith(productId);
      expect(mockStore.decrementBalance).not.toHaveBeenCalled();

      expect(result).toEqual({
        success: false,
        errorCode: 'INSUFFICIENT_BALANCE',
        productPrice: product.price,
      });
    });
  });
});
