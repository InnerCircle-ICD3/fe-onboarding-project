import { LogMessageAction, LogMessageState } from "./logMessageType";

export const initialState: LogMessageState = {
  logMessages: [],
}

export function logMessageReducer(state: LogMessageState, action: LogMessageAction) {
  switch (action.type) {
    case 'ADD_LOG_MESSAGE':
      return {
        ...state,
        logMessages: [...state.logMessages, action.payload],
      };
    default:
      return state;
  }
}