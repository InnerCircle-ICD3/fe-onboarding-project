import { createContext, Dispatch, useContext } from "react";
import { LogMessageAction, LogMessageState } from "./logMessageType";

export const LogMessageStateContext = createContext<LogMessageState | null>(null);
export const LogMessageActionContext = createContext<Dispatch<LogMessageAction> | null> (null);

export const useLogMessageState = (): LogMessageState => {
  const context = useContext(LogMessageStateContext);
  if (!context) {
    throw new Error('cannot find useLogMessageState');
  }
  return context;
}
export const useLogMessageDispatch = (): Dispatch<LogMessageAction> => {
  const context = useContext(LogMessageActionContext);
  if (!context) {
    throw new Error('cannot find useLogMessageDispatch');
  }
  return context;
};