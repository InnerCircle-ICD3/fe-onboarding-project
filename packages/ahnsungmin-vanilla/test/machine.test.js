import { describe, it, expect, beforeEach } from 'vitest';
import { createProductButton, createDisabledButton } from '../src/machine.js';

/**
 * 자판기 버튼 생성 관련 테스트
 * - 상품 버튼 생성 테스트
 * - disabled 버튼 생성 테스트
 */
describe('Machine 테스트', () => {
    // 테스트 실행할 때마다 가상 DOM 환경 초기화 (jsdom을 사용하여 브라우저 없이도 DOM 조작 가능)
    beforeEach(() => {
        document.body.innerHTML = `
            <!-- 상품 버튼들이 들어갈 컨테이너 -->
            <div class="machine-products-container"></div>

            <!-- 상품 버튼 템플릿 -->
            <template id="product-button-template">
                <button class="machine-product">
                    <span class="machine-product-name"></span>
                    <span class="machine-product-price"></span>
                </button>
            </template>
        `;
    });

    describe('상품 버튼 생성', () => {
        it('상품의 이름과 가격이 버튼의 각 span 요소에 표시된다', () => {
            // given: 테스트를 위한 전제 조건 (테스트용 상품 데이터 준비)
            const product = { name: '콜라', price: 1500 };

            // when: 테스트하고자 하는 행동 수행 (상품 버튼 생성)
            const button = createProductButton(product);
            
            // then: 테스트 결과 검증 (생성된 버튼의 내용 검증)
            expect(button.querySelector('.machine-product-name').textContent)
                .toBe('콜라');
            expect(button.querySelector('.machine-product-price').textContent)
                .toBe('1500원');
        });
    });

    describe('빈 버튼 생성', () => {
        it('disabled 버튼은 비활성화되고 내용이 비어있다', () => {
            // when: 테스트하고자 하는 행동 수행 (disabled 버튼 생성)
            const button = createDisabledButton();
            
            // then: 테스트 결과 검증 (버튼이 비활성화되고 내용이 비어있는지 검증)
            expect(button.disabled).toBe(true);
            expect(button.querySelector('.machine-product-name').textContent)
                .toBe('');
            expect(button.querySelector('.machine-product-price').textContent)
                .toBe('');
        });
    });
}); 