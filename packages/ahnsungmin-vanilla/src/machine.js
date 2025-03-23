// DOM이 완전히 로드된 후 자판기 초기화
document.addEventListener('DOMContentLoaded', () => {
    initializeVendingMachine();
});

// 자판기 상품 버튼들을 동적으로 생성하여 화면에 표시
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
    // 1. template 태그를 가져온다
    const template = document.getElementById('product-button-template');

    // 2. template 태그 안에 있던 내용(button 태그)만 쏙 빼와서 복사
    const button = template.content.cloneNode(true);  // 참고: true는 자식 요소까지 모두 복사한다는 의미 (깊은 복사)
    
    // 3. 복사된 button에 상품 정보 채우기
    button.querySelector('.machine-product-name').textContent = product.name;
    button.querySelector('.machine-product-price').textContent = `${product.price}원`;
    
    // 4. 완성된 button 요소를 찾아서 반환
    return button.querySelector('button');
}