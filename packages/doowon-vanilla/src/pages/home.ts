import { PRODUCT_LIST } from '../data/products';
import { renderProductList } from '../ui/productRenderer';

/**
 * 홈 페이지 렌더링 함수
 * @param container 페이지가 렌더링될 컨테이너
 */
export function renderHomePage(container: HTMLElement): void {
  // 컨테이너 초기화
  container.innerHTML = '';
  
  // 제품 컨테이너 생성
  const productContainer = document.createElement('div');
  productContainer.id = 'product-container';
  productContainer.className = 'grid grid-cols-3 gap-4';
  container.appendChild(productContainer);
  
  // 제품 목록 렌더링
  renderProductList(PRODUCT_LIST, productContainer);
}
