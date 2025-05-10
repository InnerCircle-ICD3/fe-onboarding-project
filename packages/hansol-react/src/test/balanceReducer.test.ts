import { describe, expect, it } from 'vitest';
import { balanceReducer } from '../store/balance/balanceReducer';


describe('balanceReducer', () => {
  it('ADD_BALANCE 액션이 들어오면 initialState에 payload만큼 더해진 결과가 반환된다.', () => {
    const initialState = { balance: 1000 };
    const result = balanceReducer(initialState, {
      type: 'ADD_BALANCE',
      payload: 1000,
    });

    expect(result.balance).toBe(2000);
  });

  it('PURCHASE_PRODUCT 액션이 들어오면 initialState에서 payload만큼 차감된 결과가 반환된다.', () => {
    const initialState = { balance: 2000 };
    const result = balanceReducer(initialState, {
      type: 'PURCHASE_PRODUCT',
      payload: 500,
    });

    expect(result.balance).toBe(1500);
  });


  it('RETURN_BALANCE는 잔액을 0으로 초기화한다', () => {
    const initialState = { balance: 3000 };
    const result = balanceReducer(initialState, {
      type: 'RETURN_BALANCE',
    });

    expect(result.balance).toBe(0);
  });
});