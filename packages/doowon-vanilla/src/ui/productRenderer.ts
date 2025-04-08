import { Button } from '../components/product_button/button';
import { Product, ProductList } from '../types/product';
import { ProductService } from '../services/productService';

/**
 * DOM 요소 선택 함수
 */
export function getElement<T extends HTMLElement>(selector: string, errorMessage: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return element;
}

/**
 * 제품 컨테이너 초기화 및 생성
 * @returns 제품 컨테이너 요소
 */
export function initializeProductContainer(): HTMLElement {
  const appDiv = getElement<HTMLDivElement>('#app', '앱 컨테이너를 찾을 수 없습니다.');
  
  // 기존 콘텐츠 초기화 및 제품 컨테이너 생성
  appDiv.innerHTML = '<div id="product-container" class="grid grid-cols-3 gap-4"></div>';
  
  return getElement<HTMLElement>('#product-container', '제품 컨테이너를 찾을 수 없습니다.');
}

/**
 * 제품 버튼 생성 함수
 * @param product 제품 정보
 * @returns 제품 이름, 가격, 함수가 추가된 버튼 요소
 */
export function createProductButton(product: Product): HTMLButtonElement {
  
  // 버튼 생성
  const button = new Button(product.name, product.price).render();
  
  // 클릭 이벤트 추가
  button.addEventListener('click', ProductService.createProductClickHandler(product));
  
  return button;
}

/**
 * 제품 렌더링 함수
 * @param products 제품 목록
 * @param container 제품이 표시될 요소
 */
export function renderProductList(products: ProductList, container: HTMLElement): void {
  products.forEach(product => {
    const button = createProductButton(product);
    container.appendChild(button);
  });
}
