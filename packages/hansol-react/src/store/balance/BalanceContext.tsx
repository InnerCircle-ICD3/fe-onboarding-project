import { createContext, Dispatch, useContext } from "react";
import { BalanceAction, BalanceState } from "./balanceType";

export const BalanceStateContext = createContext<BalanceState | 0>(0);
export const BalanceActionContext = createContext<Dispatch<BalanceAction> | null> (null);

export const useBalanceState = (): BalanceState => {
  const context = useContext(BalanceStateContext);
  if (!context) {
    throw new Error('cannot find useBalanceState');
  }
  return context;
}
export const useBalanceDispatch = (): Dispatch<BalanceAction> => {
  const context = useContext(BalanceActionContext);
  if (!context) {
    throw new Error('cannot find useBalanceDispatch');
  }
  return context;
};