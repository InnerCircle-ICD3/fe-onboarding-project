/**
 * 자판기 상태 관리 관련 테스트
 * - 금액 상태 관리 테스트
 * - 로그 기록 테스트
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { currentMoney, updateMoney, addLog, initializeStore } from '../src/store.js';

describe('Store 테스트', () => {
    // 테스트 실행할 때마다 가상 DOM 환경 초기화
    beforeEach(() => {
        document.body.innerHTML = `
            <!-- 금액 표시 영역 -->
            <div class="machine-money">0</div>
            <!-- 로그 표시 영역 -->
            <div class="log-section"></div>
            <!-- 로그 템플릿 -->
            <template id="log-template">
                <p class="log-item"></p>
            </template>
        `;
        
        // 상태 초기화
        updateMoney(0);
    });

    describe('금액 관리', () => {
        it('updateMoney에 전달한 값으로 currentMoney가 설정된다', () => {
            // when: 금액 추가
            updateMoney(1000);
            
            // then: 상태 검증
            expect(currentMoney).toBe(1000);
        });

        it('updateMoney에 전달한 값이 3자리마다 쉼표가 찍힌 값이 화면에 표시된다', () => {
            // when: 금액 추가
            updateMoney(1500);
            
            // then: 화면 표시 검증
            const display = document.querySelector('.machine-money');
            expect(display.textContent).toBe('1,500');
        });
    });

    describe('로그 기능', () => {
        it('updateMoney에 전달한 값이 로그 메시지에 포함된다', () => {
            // when: 금액 투입
            updateMoney(1000);
            
            // then: 로그 메시지 검증
            const logSection = document.querySelector('.log-section');
            const logText = logSection.lastElementChild.textContent;
            expect(logText).toContain('1,000원을 투입했습니다');
        });

        it('큰 금액도 로그 메시지에 표시된다', () => {
            updateMoney(1000000);
            
            const logSection = document.querySelector('.log-section');
            const logText = logSection.lastElementChild.textContent;
            expect(logText).toContain('1,000,000원을 투입했습니다');
        });
    });
}); 