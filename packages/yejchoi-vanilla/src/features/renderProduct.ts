import { Product } from "../types/types";
import {handleProductButton} from "./productHandler.ts";

export const renderProduct  = async () => {
        const response = await fetch("/data/productData.json");

        const productList: Product[] = await response.json();

        const productGrid = document.querySelector("#productGrid");

        productList.forEach(product => {

            const btn = document.createElement("button");
            const enabled  = product?.isUsed;

            btn.disabled = !enabled;
            btn.className = "product-button";
            btn.id = `product-${product.id}`;
            btn.innerHTML = enabled ? `${product.name}<br/>${product.price}원` : `${product.name}`;
            productGrid?.appendChild(btn);


            handleProductButton(product);
        });

}
