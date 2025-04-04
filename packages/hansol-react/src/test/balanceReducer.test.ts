import { describe, expect, it } from 'vitest';
import { balanceReducer, initialState } from '../store/balance/balanceReducer';


describe('balanceReducer', () => {
  it('ADD_BALANCE는 잔액을 더한다', () => {
    const result = balanceReducer(initialState, {
      type: 'ADD_BALANCE',
      payload: 1000,
    });

    expect(result.balance).toBe(1000);
  });

  it('PURCHASE_PRODUCT는 잔액을 감소시킨다', () => {
    const startState = { balance: 2000 };
    const result = balanceReducer(startState, {
      type: 'PURCHASE_PRODUCT',
      payload: 500,
    });

    expect(result.balance).toBe(1500);
  });

  it('RETURN_BALANCE는 잔액을 0으로 초기화한다', () => {
    const startState = { balance: 3000 };
    const result = balanceReducer(startState, {
      type: 'RETURN_BALANCE',
    });

    expect(result.balance).toBe(0);
  });
});