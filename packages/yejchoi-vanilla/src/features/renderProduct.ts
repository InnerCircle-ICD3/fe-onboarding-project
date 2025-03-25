import { Product } from "../types/types";
import {handleProductButton} from "./productHandler.ts";

export const renderProduct  = async () => {
    try {
        const response = await fetch("/data/productData.json");

        const productList: Product[] = await response.json();

        const productGrid = document.querySelector("#productGrid");

        productList.forEach(product => {
            const btn = document.createElement("button");
            btn.className = "product-button";
            btn.id = `product-${product.id}`
            btn.innerHTML = `${product.name}<br/>${product.price}원`;
            productGrid?.appendChild(btn);

            handleProductButton(product)
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Unknown error", error);
        }
    }
}
