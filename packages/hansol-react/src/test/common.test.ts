import { describe, it, expect } from 'vitest';
import { getInputNumberValue, formatCurrencyKRW, appendParticle } from '../utils/common';

describe('getInputNumberValue()', () => {
  it('쉼표가 있는 숫자 문자열을 숫자로 반환한다', () => {
    const input = document.createElement('input');
    input.value = '1,500';
    expect(getInputNumberValue(input)).toBe(1500);
  });

  it('입력이 없으면 NaN을 반환한다', () => {
    expect(getInputNumberValue(null)).toBeNaN();
  });
});

describe('formatCurrencyKRW()', () => {
  it('숫자를 한국 원화 포맷으로 포맷팅한다', () => {
    expect(formatCurrencyKRW(1000)).toBe('1,000');
    expect(formatCurrencyKRW(2500000)).toBe('2,500,000');
  });
});

describe('appendParticle()', () => {
  it('받침이 있는 단어에는 "을"을 붙인다', () => {
    expect(appendParticle('밥')).toBe('밥을');
    expect(appendParticle('떡')).toBe('떡을');
  });

  it('받침이 없는 단어에는 "를"을 붙인다', () => {
    expect(appendParticle('사과')).toBe('사과를');
    expect(appendParticle('우유')).toBe('우유를');
  });
});