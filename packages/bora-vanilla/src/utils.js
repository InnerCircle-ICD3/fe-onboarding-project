import { ERROR_CODE } from './constants';

/** 문자열에서 숫자만 추출합니다. */
export const extractDigitsOnly = (value) => {
  return value.replace(/[^\d]/g, '');
};

/** 콤마가 포함된 문자열에서 콤마를 제거하고 정수로 변환합니다. */
export const parseNumberWithCommas = (value) => {
  return Number.parseInt(value.replace(/,/g, ''), 10);
};

/** 에러 코드 생성 */
export const createError = (errorCode) => {
  if (!Object.values(ERROR_CODE).includes(errorCode)) {
    console.error(`유효하지 않은 에러 코드: ${errorCode}`);
  }

  return { success: false, errorCode };
};
