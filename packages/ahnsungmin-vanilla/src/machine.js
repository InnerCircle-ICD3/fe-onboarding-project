import { currentMoney, updateMoney, updateMoneyDisplay, addLog } from './store.js';

// DOM이 완전히 로드된 후 자판기 초기화
document.addEventListener('DOMContentLoaded', () => {
    initializeVendingMachine();
});

// 자판기 상품 버튼들을 동적으로 생성하여 화면에 표시
const products = [
    { name: '콜라', price: 1500, particle: '를' },
    { name: '속이사이다', price: 1700, particle: '를' },
    { name: '판타지판타', price: 1500, particle: '를' },
    { name: '오뎅국물', price: 1800, particle: '을' },
    { name: '부장라떼', price: 800, particle: '를' },
    { name: '판타지판타', price: 1500, particle: '를' },
    { name: '레드뿔', price: 2500, particle: '을' },
    { name: '핫세븐', price: 1900, particle: '을' },
    { name: '커피우유', price: 1400, particle: '를' },
];

function initializeVendingMachine() {
    const productsContainer = document.querySelector('.machine-products-container');
    products.forEach(product => {
        const button = createProductButton(product);
        productsContainer.appendChild(button);
    });
}

// 상품 버튼 생성
function createProductButton(product) {
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
            addLog(`${product.name}${product.particle} 구매했습니다.`);
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