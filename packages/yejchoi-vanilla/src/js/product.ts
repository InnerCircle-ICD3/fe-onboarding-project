interface Product {
    name : string
    price : number
}


try {
    const response = await fetch("/data/productData.json");

    const productList: Product[] = await response.json();

    const productGrid = document.querySelector("#productGrid");

    productList.forEach(product => {
        const btn = document.createElement("button");
        btn.className = "product-button";
        btn.innerHTML = `${product.name}<br/>${product.price}원`;
        productGrid?.appendChild(btn);
    });
} catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    } else {
        console.error("Unknown error", error);
    }
}