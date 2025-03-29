import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatter, extractDigitsOnly, parseNumberWithCommas, formatDigitsWithCommas, createError } from '../js/utils';
import { ERROR_CODE } from '../js/constants';

vi.mock('../js/constants', () => ({
  ERROR_CODE: {
    PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
    INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
    INVALID_AMOUNT: 'INVALID_AMOUNT',
    EXCEED_MAX_AMOUNT: 'EXCEED_MAX_AMOUNT',
    NO_BALANCE_TO_RETURN: 'NO_BALANCE_TO_RETURN',
  },
}));

describe('Utils', () => {
  describe('extractDigitsOnly', () => {
    it('문자열에서 숫자만 추출해야 한다', () => {
      expect(extractDigitsOnly('abc123')).toBe('123');
      expect(extractDigitsOnly('1,000원')).toBe('1000');
      expect(extractDigitsOnly('가격: 5,000원')).toBe('5000');
      expect(extractDigitsOnly('!@#$%^')).toBe('');
      expect(extractDigitsOnly('')).toBe('');
    });
  });

  describe('parseNumberWithCommas', () => {
    it('콤마가 포함된 문자열을 정수로 변환해야 한다', () => {
      expect(parseNumberWithCommas('1,000')).toBe(1000);
      expect(parseNumberWithCommas('5,432,100')).toBe(5432100);
      expect(parseNumberWithCommas('0')).toBe(0);
      expect(parseNumberWithCommas('100')).toBe(100);
    });
  });

  describe('formatDigitsWithCommas', () => {
    it('문자열에서 숫자만 추출하여 콤마 형식으로 변환해야 한다', () => {
      const result1 = formatDigitsWithCommas('1000');
      expect(result1).toMatch('1,000');

      const result2 = formatDigitsWithCommas('가격5000원');
      expect(result2).toMatch('5,000');

      expect(formatDigitsWithCommas('abc')).toBe('');
      expect(formatDigitsWithCommas('')).toBe('');
    });
  });

  describe('createError', () => {
    it('유효한 에러 코드라면 에러 객체를 반환해야 한다.', () => {
      const validErrorCode = Object.values(ERROR_CODE)[0];
      const result = createError(validErrorCode);

      expect(result).toEqual({
        success: false,
        errorCode: validErrorCode,
      });
    });

    it('유효하지 않은 에러 코드라면 예외를 던진다', () => {
      const invalidErrorCode = 'INVALID_ERROR_CODE';
      expect(() => createError(invalidErrorCode)).toThrow();
    });
  });
});
