import { updateMoney, currentMoney, addLog, updateMoneyDisplay } from './store';

// DOM이 완전히 로드된 후 자판기 초기화
document.addEventListener('DOMContentLoaded', () => {
    initializeVendingMachine();
});

// 한 줄에 표시할 상품 수
const PRODUCTS_PER_ROW = 3;

// 상품 데이터
interface Product { name: string; price: number; }
const products: Product[] = [
    { name: '속이사이다', price: 1700 },
    { name: '판타지판타', price: 1500 },
    { name: '오뎅국물', price: 1800 },
    { name: '부장라떼', price: 800 },
    { name: '판타지판타', price: 1500 },
    { name: '레드뿔', price: 2500 },
    { name: '핫세븐', price: 1900 },
    { name: '커피우유', price: 1400 },
    { name: '패스트소주', price: 10000 },
    { name: '금가루', price: 99999 }
];

// 전체 슬롯 수를 계산
function calculateTotalSlots(productsLength: number): number {
    return Math.ceil(productsLength / PRODUCTS_PER_ROW) * PRODUCTS_PER_ROW;
}

// 자판기 초기화
function initializeVendingMachine(): void {
    const productsContainer = document.querySelector<HTMLDivElement>('.machine-products-container');
    if (!productsContainer) return;

    // A) 상품 버튼 생성
    products.forEach(product => {
        const button = createProductButton(product);
        productsContainer.appendChild(button);
    });

    // B) 남은 슬롯에 disabled 버튼 추가
    const totalSlots = calculateTotalSlots(products.length);
    const remainingSlots = totalSlots - products.length;
    for (let i = 0; i < remainingSlots; i++) {
        const button = createDisabledButton();
        productsContainer.appendChild(button);
    }
}

// A) 상품 버튼 생성
export function createProductButton(product: Product): HTMLButtonElement {
    // 1. template 태그를 가져온 뒤, template 태그 안에 있던 내용(button 태그)만 쏙 빼와서 복사
    const template = document.querySelector<HTMLTemplateElement>('#product-button-template');
    if (!template) {
        console.error('템플릿을 찾을 수 없습니다.');
        return document.createElement('button');  // 빈 버튼 반환
    }
    
    // 2. 복사된 button에 상품 정보 채우기
    const clone = template.content.cloneNode(true);
    if (!(clone instanceof DocumentFragment)) {
        console.error('클론이 DocumentFragment가 아닙니다.');
        return document.createElement('button');  // 빈 버튼 반환
    }
    
    const button = clone.querySelector<HTMLButtonElement>('.machine-product');
    if (!button) {
        console.error('버튼을 찾을 수 없습니다.');
        return document.createElement('button');  // 빈 버튼 반환
    }
    
    const nameSpan = button.querySelector<HTMLSpanElement>('.machine-product-name');
    const priceSpan = button.querySelector<HTMLSpanElement>('.machine-product-price');
    
    if (nameSpan && priceSpan) {
        nameSpan.textContent = product.name;
        priceSpan.textContent = `${product.price.toLocaleString('ko-KR')}원`;
    }

    // 3. 완성된 button에 클릭 이벤트 추가
    button.addEventListener('mousedown', () => {
        if (currentMoney < product.price) {
            updateMoneyDisplay(product.price);  // 잔액이 부족할 경우 가격 미리보기
        }
    });

    button.addEventListener('mouseup', () => {
        if (currentMoney >= product.price) {
            addLog(`${product.name}${getKoreanParticle(product.name)} 구매했습니다.`);
            updateMoney(currentMoney - product.price);  // 잔액이 충분하면 구매 처리 후 화면 업데이트
        } else {
            updateMoneyDisplay(currentMoney);  // 잔액이 부족하면 구매 X (마우스 뗐을 때 현재 잔액 표시)
        }
    });

    button.addEventListener('mouseleave', () => {
        updateMoneyDisplay(currentMoney);  // 버튼에서 마우스가 벗어나도 현재 잔액 표시
    });
    
    return button;
}

// B) disabled 버튼 생성
export function createDisabledButton(): HTMLButtonElement {
    const template = document.querySelector<HTMLTemplateElement>('#product-button-template');
    if (!template) {
        console.error('템플릿을 찾을 수 없습니다.');
        return document.createElement('button');  // 빈 버튼 반환
    }
    
    const clone = template.content.cloneNode(true);
    if (!(clone instanceof DocumentFragment)) {
        console.error('클론이 DocumentFragment가 아닙니다.');
        return document.createElement('button');  // 빈 버튼 반환
    }
    
    const button = clone.querySelector<HTMLButtonElement>('.machine-product');
    if (!button) {
        console.error('버튼을 찾을 수 없습니다.');
        return document.createElement('button');  // 빈 버튼 반환
    }
    
    button.disabled = true;
    const nameSpan = button.querySelector<HTMLSpanElement>('.machine-product-name');
    const priceSpan = button.querySelector<HTMLSpanElement>('.machine-product-price');
    
    if (nameSpan && priceSpan) {
        nameSpan.textContent = '';
        priceSpan.textContent = '';
    }
    
    return button;
}

/**
 * 한글 조사 '을/를' 판단 함수
 * - 한글 유니코드 구성: (초성 * 21 * 28) + (중성 * 28) + 종성 + 0xAC00
 * - 0xAC00: 유니코드 테이블에서 한글 글자가 시작하는 번호 ('가')
 * - 종성 인덱스가 0이면 받침 없음('를' 사용), 1~27이면 받침 있음('을' 사용)
 * 
 * 예시
 * - 초성 0번째 인덱스: ㄱ / 1번째 인덱스: ㄲ
 * - 중성 0번째 인덱스: ㅏ / 1번째 인덱스: ㅐ
 * - 종성 0번째 인덱스: 없음 / 1번째 인덱스: ㄱ (예를들면 각이라는 글자에서 종성의 인덱스는 1)
 */
export function getKoreanParticle(str: string): '을' | '를' {
    const charCode = str.charCodeAt(str.length - 1);  // 마지막 문자 코드를 가져옴 (마지막 문자를 토대로 '을/를' 판단하기 때문)
    const hasFinalConsonant = (charCode - 0xAC00) % 28 > 0;  // 한글 유니코드에서 종성 인덱스를 계산 (종성 인덱스가 0보다 크면 받침이 있는 것이므로 '을'을 사용)
    return hasFinalConsonant ? '을' : '를';  // 받침이 있으면 '을', 없으면 '를'을 반환 
}