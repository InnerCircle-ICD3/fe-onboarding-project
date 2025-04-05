import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import {
  BalanceStateContext,
  BalanceActionContext,
} from '../store/balance/BalanceContext';
import {
  LogMessageStateContext,
  LogMessageActionContext,
} from '../store/logMessage/LogMessageContext';
import { vi } from 'vitest';

export const renderWithProviders = (
  ui: ReactNode,
  {
    balanceState = { balance: 0 },
    balanceDispatch = vi.fn(),
    logState = { logMessages: [] },
    logDispatch = vi.fn(),
  } = {}
) => {
  return render(
    <BalanceStateContext.Provider value={balanceState}>
      <BalanceActionContext.Provider value={balanceDispatch}>
        <LogMessageStateContext.Provider value={logState}>
          <LogMessageActionContext.Provider value={logDispatch}>
            {ui}
          </LogMessageActionContext.Provider>
        </LogMessageStateContext.Provider>
      </BalanceActionContext.Provider>
    </BalanceStateContext.Provider>
  );
};
