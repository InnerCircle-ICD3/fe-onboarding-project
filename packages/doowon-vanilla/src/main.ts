import './style.css';

// 타입 및 데이터 가져오기
import { PRODUCT_LIST } from './data/products';

// UI 렌더링 함수 가져오기
import { initializeProductContainer, renderProductList } from './ui/productRenderer';

/**
 * 애플리케이션 초기화 함수
 */
function initApp(): void {
  try {
    // 제품 컨테이너
    const productContainer = initializeProductContainer();
    
    // 제품 목록 렌더링
    renderProductList(PRODUCT_LIST, productContainer);
    
    console.log('애플리케이션이 성공적으로 초기화되었습니다.');
  } catch (error) {
    console.error('애플리케이션 초기화 중 오류 발생:', error);
  }
}

// 애플리케이션 시작
initApp();

