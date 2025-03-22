interface Product {
    name : string
    price : number
}

document.addEventListener("DOMContentLoaded", async () => {

    const response = await fetch("./products.json");
    const productList :Product[]  = await response.json();

    const productGrid = document.querySelector(".productGrid");

    productList.forEach(product => {
        const btn = document.createElement("button");
        btn.className = "product-button";
        btn.innerHTML = `${product.name}<br/>${product.price}원`;
        productGrid?.appendChild(btn);
    });
});