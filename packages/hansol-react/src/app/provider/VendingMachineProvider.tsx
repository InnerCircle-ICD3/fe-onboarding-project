import { FC, PropsWithChildren, useReducer } from "react";
import { logMessageReducer, initialState as initialLogMessageState } from "../../store/logMessage/logMessageReducer";
import { balanceReducer, initialState as initialBalanceState } from "../../store/balance/balanceReducer";
import { LogMessageActionContext, LogMessageStateContext } from "../../store/logMessage/LogMessageContext";
import { BalanceActionContext, BalanceStateContext } from "../../store/balance/BalanceContext";

export const VendingMachineProvider: FC<PropsWithChildren> = ({ children }) => {
  const [logState, logDispatch] = useReducer(logMessageReducer, initialLogMessageState);
  const [balanceState, balanceDispatch] = useReducer(balanceReducer, initialBalanceState);

  return (
    <LogMessageStateContext.Provider value={logState}>
      <LogMessageActionContext.Provider value={logDispatch}>
        <BalanceStateContext.Provider value={balanceState}>
          <BalanceActionContext.Provider value={balanceDispatch}>
            {children}
          </BalanceActionContext.Provider>
        </BalanceStateContext.Provider>
      </LogMessageActionContext.Provider>
    </LogMessageStateContext.Provider>
  );
};
