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

// 상품 버튼 생성 함수
function createProductButton(product) {
    const button = document.createElement('button');
    button.className = 'machine-product';
    button.innerHTML = `
        <span class="machine-product-name">${product.name}</span>
        <span class="machine-product-price">${product.price}원</span>
    `;
    return button;
}