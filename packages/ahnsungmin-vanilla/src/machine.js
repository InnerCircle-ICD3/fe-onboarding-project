import { currentMoney, updateMoney, updateMoneyDisplay, addLog } from './store.js';

// DOM이 완전히 로드된 후 자판기 초기화
document.addEventListener('DOMContentLoaded', () => {
    initializeVendingMachine();
});

// 한 줄에 표시할 상품 수
const PRODUCTS_PER_ROW = 3;

// 상품 데이터
const products = [
    { name: '콜라', price: 1500 },
    { name: '속이사이다', price: 1700 },
    { name: '판타지판타', price: 1500 },
    { name: '오뎅국물', price: 1800 },
    { name: '부장라떼', price: 800 },
    { name: '판타지판타', price: 1500 },
    { name: '레드뿔', price: 2500 },
    { name: '핫세븐', price: 1900 },
    { name: '커피우유', price: 1400 },
    { name: '패스트소주', price: 10000 },
    { name: '금가루', price: 99999 },
    // 1개 부족 (disabled 처리)
];

// 전체 슬롯 수를 3의 배수로 계산하는 함수
function calculateTotalSlots(productsLength) {
    return Math.ceil(productsLength / PRODUCTS_PER_ROW) * PRODUCTS_PER_ROW;  // 예시) 상품이 8개일 때: 8 / 3 = 2.666 → Math.ceil(2.666) = 3 → 3 * 3 = 9개 슬롯
}

function initializeVendingMachine() {
    const productsContainer = document.querySelector('.machine-products-container');
    const totalSlots = calculateTotalSlots(products.length);
    
    // A) 먼저 상품 버튼들을 생성
    products.forEach(product => {
        const button = createProductButton(product);
        productsContainer.appendChild(button);
    });

    // B) 남은 슬롯만큼 disabled 버튼 추가
    const remainingSlots = totalSlots - products.length;
    for (let i = 0; i < remainingSlots; i++) {
        const button = createDisabledButton();
        productsContainer.appendChild(button);
    }
}

// A) 상품 버튼 생성
export function createProductButton(product) {
    // 1. template 태그를 가져온 뒤, template 태그 안에 있던 내용(button 태그)만 쏙 빼와서 복사
    const template = document.getElementById('product-button-template');
    const button = template.content.cloneNode(true);  // 참고: true는 자식 요소까지 모두 복사한다는 의미 (깊은 복사)
    
    // 2. 복사된 button에 상품 정보 채우기
    button.querySelector('.machine-product-name').textContent = product.name;
    button.querySelector('.machine-product-price').textContent = `${product.price}원`;
    
    // 3. 완성된 button에 클릭 이벤트 추가
    const buttonElement = button.querySelector('button');

    buttonElement.addEventListener('mousedown', () => {
        if (currentMoney < product.price) {
            updateMoneyDisplay(product.price);  // 잔액이 부족할 경우 가격 미리보기
        }
    });

    buttonElement.addEventListener('mouseup', () => {
        if (currentMoney >= product.price) {
            addLog(`${product.name}${getKoreanParticle(product.name)} 구매했습니다.`);
            updateMoney(currentMoney - product.price);  // 잔액이 충분하면 구매 처리 후 화면 업데이트
        } else {
            updateMoneyDisplay(currentMoney);  // 잔액이 부족하면 구매 X (마우스 뗐을 때 현재 잔액 표시)
        }
    });

    buttonElement.addEventListener('mouseleave', () => {
        updateMoneyDisplay(currentMoney);  // 버튼에서 마우스가 벗어나도 현재 잔액 표시
    });

    return buttonElement;
}

// B) disabled 버튼 생성
export function createDisabledButton() {
    const template = document.getElementById('product-button-template');
    const clone = template.content.cloneNode(true);
    const buttonElement = clone.querySelector('button');
    
    // disabled 버튼 설정
    buttonElement.disabled = true;
    buttonElement.querySelector('.machine-product-name').textContent = '';
    buttonElement.querySelector('.machine-product-price').textContent = '';
    return buttonElement;
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
function getKoreanParticle(str) {
    return (str.at(-1).charCodeAt(0) - 0xac00) % 28 ? '을' : '를';
}