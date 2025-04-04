import { BalanceAction, BalanceState } from "./balanceType";

export const initialState: BalanceState = {
  balance: 0,
};

export function balanceReducer(
  state: BalanceState,
  action: BalanceAction
): BalanceState {
  switch (action.type) {
    case 'ADD_BALANCE':
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case 'PURCHASE_PRODUCT':
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case 'RETURN_BALANCE':
      return {
        ...state,
        balance: 0,
      };
    default:
      return state;
  }
}