import { describe, it, expect } from 'vitest';
import { getInputNumberValue, formatCurrencyKRW } from '../utils/common';

describe('getInputNumberValue', () => {
  it('쉼표가 있는 숫자 문자열을 숫자로 반환한다', () => {
    const input = document.createElement('input');
    input.value = '1,500';
    expect(getInputNumberValue(input)).toBe(1500);
  });

  it('입력이 없으면 NaN을 반환한다', () => {
    expect(getInputNumberValue(null)).toBeNaN();
  });
});

describe('formatCurrencyKRW', () => {
  it('숫자를 한국 원화 포맷으로 포맷팅한다', () => {
    expect(formatCurrencyKRW(1000)).toBe('1,000');
    expect(formatCurrencyKRW(2500000)).toBe('2,500,000');
  });
});