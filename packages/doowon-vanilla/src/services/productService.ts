import { Product } from '../types/product';

/**
 * 제품 관련 서비스를 처리하는 클래스
 */
export class ProductService {  
  /**
   * @param product 제품 정보
   * @returns 클릭 이벤트 핸들러 함수
   */
  public static createProductClickHandler(product: Product): () => void {
    return function() {
        // 기본 클릭 동작 처리
        const { name, price } = product;
        alert(`${name}을(를) 선택하셨습니다. 가격: ₩${price.toLocaleString()}`);
    };
  }
}
