import { describe, expect, it } from "vitest";
import { initialState, logMessageReducer } from "../store/logMessage/logMessageReducer";

describe('logMessageReducer', () => {
  it('ADD_LOG_MESSAGE 액션으로 전달된 message가 logMessages 배열에 추가된다.', () => {
    const message = '1,000원을 투입했습니다.';
  
    const result = logMessageReducer(initialState, {
      type: 'ADD_LOG_MESSAGE',
      payload: message,
    });
  
    expect(result.logMessages).toContain(message);
  });
});