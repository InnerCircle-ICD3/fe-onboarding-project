import { beforeEach, describe, expect, it, vi } from 'vitest';
import productsData from '../db/productsData';
import { createVendingMachineController } from '../js/controller';
import { ERROR_CODE, ERROR_MESSAGES } from '../js/constants';

describe('VendingMachineController', () => {
  let mockService;
  let mockView;
  let mockStore;
  let controller;

  beforeEach(() => {
    // 서비스 모킹
    mockService = {
      insertMoney: vi.fn(),
      buyProduct: vi.fn(),
      returnMoney: vi.fn(),
      validatePurchase: vi.fn(),
    };

    // 뷰 모킹
    mockView = {
      renderBalanceDisplay: vi.fn(),
      renderLogMessage: vi.fn(),
      clearMoneyInput: vi.fn(),
      renderProducts: vi.fn(),
    };

    // 스토어 모킹
    mockStore = {
      getBalance: vi.fn().mockReturnValue(0),
      getProducts: vi.fn(),
    };

    controller = createVendingMachineController(mockService, mockView, mockStore);
  });

  describe('handleMoneyAmountInput', () => {
    it('값이 없을 때 빈 문자열을 반환해야 한다', () => {
      const result = controller.handleMoneyAmountInput('');
      expect(result).toBe('');
    });

    it('값이 있을 때 콤마가 포함된 형식으로 반환해야 한다', () => {
      const result = controller.handleMoneyAmountInput('1000');
      expect(result).toBe('1,000');
    });
  });

  describe('handleMoneyInsert()', () => {
    it('성공적으로 금액을 투입해야 한다.', () => {
      mockService.insertMoney.mockReturnValue({
        success: true,
        amount: 3000,
        updatedBalance: 3000,
      });

      controller.handleMoneyInsert('3000');

      expect(mockService.insertMoney).toHaveBeenCalledWith(3000);
      expect(mockView.renderBalanceDisplay).toHaveBeenCalledWith(3000);
      expect(mockView.renderLogMessage).toHaveBeenCalledWith('3,000원이 투입되었습니다.');
      expect(mockView.clearMoneyInput).toHaveBeenCalled();
    });

    it('금액 투입 실패시 에러 메시지를 표시해야 한다.', () => {
      mockService.insertMoney.mockReturnValue({
        success: false,
        errorCode: ERROR_CODE.INVALID_AMOUNT,
      });

      controller.handleMoneyInsert('-100');

      expect(mockService.insertMoney).toHaveBeenCalledWith(-100);
      expect(mockView.renderLogMessage).toHaveBeenCalledWith(ERROR_MESSAGES[ERROR_CODE.INVALID_AMOUNT]);
      expect(mockView.renderBalanceDisplay).not.toHaveBeenCalled();
    });
  });

  describe('handleProductPurchase()', () => {
    it('성공적으로 상품을 구매해야 한다.', () => {
      const product = productsData[0];

      mockService.buyProduct.mockReturnValue({
        success: true,
        product,
        updatedBalance: 2000,
      });

      controller.handleProductPurchase(product.id);

      expect(mockService.buyProduct).toHaveBeenCalledWith(product.id);
      expect(mockView.renderBalanceDisplay).toHaveBeenCalledWith(2000);
      expect(mockView.renderLogMessage).toHaveBeenCalledWith(`${product.name}을(를) 구매하셨습니다.`);
    });

    it('잔액 부족으로 구매 실패시 에러 메세지를 표시해야 한다', () => {
      const product = productsData[0];

      mockService.buyProduct.mockReturnValue({
        success: false,
        errorCode: ERROR_CODE.INSUFFICIENT_BALANCE,
      });

      controller.handleProductPurchase(product.id);

      expect(mockService.buyProduct).toHaveBeenCalledWith(product.id);
      expect(mockView.renderLogMessage).toHaveBeenCalledWith(ERROR_MESSAGES[ERROR_CODE.INSUFFICIENT_BALANCE]);
      expect(mockView.renderBalanceDisplay).not.toHaveBeenCalled();
    });
  });

  describe('handleMoneyReturn', () => {
    it('성공적으로 잔돈을 반환해야 한다', () => {
      mockService.returnMoney.mockReturnValue({
        success: true,
        returnBalance: 5000,
        updatedBalance: 0,
      });

      controller.handleMoneyReturn();

      expect(mockService.returnMoney).toHaveBeenCalled();
      expect(mockView.renderLogMessage).toHaveBeenCalledWith('5,000원이 반환되었습니다.');
      expect(mockView.renderBalanceDisplay).toHaveBeenCalledWith(0);
    });

    it('잔돈 반환 실패시 에러 메시지를 표시해야 한다', () => {
      mockService.returnMoney.mockReturnValue({
        success: false,
        errorCode: ERROR_CODE.NO_BALANCE_TO_RETURN,
      });

      controller.handleMoneyReturn();

      expect(mockService.returnMoney).toHaveBeenCalled();
      expect(mockView.renderLogMessage).toHaveBeenCalledWith(ERROR_MESSAGES[ERROR_CODE.NO_BALANCE_TO_RETURN]);
      expect(mockView.renderBalanceDisplay).not.toHaveBeenCalled();
    });
  });

  describe('handlePurchaseValidate', () => {
    it('구매 검증 성공시 잔액을 업데이트해야 한다.', () => {
      const product = productsData[0];

      mockService.validatePurchase.mockReturnValue({
        success: true,
        updatedBalance: 2000,
      });

      controller.handlePurchaseValidate(product.id);

      expect(mockService.validatePurchase).toHaveBeenCalledWith(product.id);
      expect(mockView.renderBalanceDisplay).toHaveBeenCalledWith(2000);
    });

    it('잔액 부족으로 구매 실패시 상품 가격을 표시해야 한다.', () => {
      const product = productsData[0];

      mockService.validatePurchase.mockReturnValue({
        success: false,
        productPrice: product.price,
      });

      controller.handlePurchaseValidate(product.id);

      expect(mockService.validatePurchase).toHaveBeenCalledWith(product.id);
      expect(mockView.renderBalanceDisplay).toHaveBeenCalledWith(product.price);
    });
  });

  describe('handlePurchaseValidateEnd', () => {
    it('현재 잔액을 표시해야 한다.', () => {
      mockStore.getBalance.mockReturnValue(3000);

      controller.handlePurchaseValidateEnd();

      expect(mockStore.getBalance).toHaveBeenCalled();
      expect(mockView.renderBalanceDisplay).toHaveBeenCalledWith(3000);
    });
  });
});
