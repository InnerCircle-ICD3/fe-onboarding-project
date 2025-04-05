import { describe, it, expect } from 'vitest';
import { getKoreanParticle } from '../src/machine.js';

/**
 * 유틸리티 함수 테스트
 * - 금액 포맷팅 테스트
 * - 한글 조사 처리 테스트
 */
describe('Utils 테스트', () => {
    describe('금액 포맷팅', () => {
        it('천 단위로 쉼표를 추가해야 한다', () => {
            // when & then: 다양한 금액에 대한 포맷팅 검증
            expect((1000).toLocaleString('ko-KR')).toBe('1,000');
            expect((1000000).toLocaleString('ko-KR')).toBe('1,000,000');
        });

        it('0은 0으로 표시해야 한다', () => {
            // when & then: 0 처리 검증
            expect((0).toLocaleString('ko-KR')).toBe('0');
        });
    });

    describe('getKoreanParticle', () => {
        it('받침이 있는 단어는 "을"을 반환해야 한다', () => {
            // when & then: 받침이 있는 경우 검증
            expect(getKoreanParticle('물')).toBe('을');
            expect(getKoreanParticle('핫세븐')).toBe('을');
        });

        it('받침이 없는 단어는 "를"을 반환해야 한다', () => {
            // when & then: 받침이 없는 경우 검증
            expect(getKoreanParticle('커피')).toBe('를');
            expect(getKoreanParticle('환타')).toBe('를');
        });
    });
}); 