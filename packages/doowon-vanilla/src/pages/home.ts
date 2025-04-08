import { ProductContainer } from "../components/product_button/productContainer";
import { LogContainer } from "../components/product_log/logContainer";
import { PRODUCT_LIST } from "../data/products";
import { renderProductList } from "../ui/productRenderer";

/**
 * 홈 페이지 렌더링 함수
 * @param container 페이지가 렌더링될 컨테이너
 */
export function renderHomePage(container: HTMLElement): void {
  // 컨테이너 초기화
  container.innerHTML = "";

  // 홈 컨테이너 생성
  // 제품 컨테이너와 로그 컨테이너를 포함
  const homeContainer = document.createElement("div");
  homeContainer.id = "home-container";
  homeContainer.className = "grid grid-cols-5 gap-4";
  container.appendChild(homeContainer);

  // 제품 컨테이너 생성
  const productContainer = new ProductContainer().render();
  homeContainer.appendChild(productContainer);

  const logContainer = new LogContainer().render();
  homeContainer.appendChild(logContainer);
}
