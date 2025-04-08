import { PRODUCT_LIST } from "../../data/products";
import { renderProductList } from "../../ui/productRenderer";
import { DisplayHeader } from "./displayHeader";

export class ProductContainer {
  render(): HTMLDivElement {
    const container = document.createElement("div");
    container.classList.add("col-span-3");

    // 새로 만든 DisplayHeader 컴포넌트 사용
    const header = new DisplayHeader().render();
    container.appendChild(header);

    const body = document.createElement("div");
    body.id = "product-container";
    body.className = "grid grid-cols-3 gap-4";
    container.appendChild(body);

    renderProductList(PRODUCT_LIST, body);
    return container;
  }
}
