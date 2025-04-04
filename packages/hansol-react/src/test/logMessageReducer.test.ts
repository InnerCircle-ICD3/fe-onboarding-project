import { describe, expect, it } from "vitest";
import { initialState, logMessageReducer } from "../store/logMessage/logMessageReducer";

describe('logMessageReducer', () => {
  it('ADD_LOG_MESSAGE는 로그 메시지를 추가한다', () => {
    const result = logMessageReducer(initialState, {
      type: 'ADD_LOG_MESSAGE',
      payload: '1,000원을 투입했습니다.',
    });

    expect(result.logMessages[0]).toBe('1,000원을 투입했습니다.');
  }
  );
});