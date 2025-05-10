export interface BalanceState {
  balance: number;
}

export type BalanceAction = 
  | { type: 'ADD_BALANCE'; payload: number }
  | { type: 'PURCHASE_PRODUCT'; payload: number }
  | { type: 'RETURN_BALANCE' };
