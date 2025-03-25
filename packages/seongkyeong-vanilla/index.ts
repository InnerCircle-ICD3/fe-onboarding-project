interface Menu {
    name: string;
    price: number;
}

const menuItems: Menu[] = [
    { name: "콜라", price: 1500 },
    { name: "속이사이다", price: 1700 },
    { name: "판타지판타", price: 1500 },
    { name: "오뎅국물", price: 1800 },
    { name: "부장라떼", price: 800 },
    { name: "판타지판타", price: 1500 },
    { name: "레드뿔", price: 2500 },
    { name: "핫세븐", price: 1900 },
    { name: "커피우유", price: 1400 }
];

const drawMenuButtons = () => {
    const $menuWrapper = document.querySelector(".menu-btn-wrapper");

    for (const menu of menuItems) {
        const $menuBtn = document.createElement("button");
        const $name = document.createElement("p");
        const $price = document.createElement("p");
        
        $menuBtn.className = "menu-item";
        $name.innerHTML = menu.name;
        $price.innerHTML = `${menu.price}원`;
        $menuBtn.appendChild($name);
        $menuBtn.appendChild($price);

        $menuWrapper?.appendChild($menuBtn);
    }
}

drawMenuButtons();