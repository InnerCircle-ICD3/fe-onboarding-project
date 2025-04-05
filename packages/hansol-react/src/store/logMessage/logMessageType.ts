export interface LogMessageState {
  logMessages: string[];
}

export type LogMessageAction =
  | { type: 'ADD_LOG_MESSAGE'; payload: string };