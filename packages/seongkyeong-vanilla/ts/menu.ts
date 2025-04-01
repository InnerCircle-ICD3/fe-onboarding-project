import { convertLocaleTextToNum } from "../util/localeTextConverter";
import { LogType, publishLogEvent } from "./log";

interface Menu {
    name: string;
    price: number;
    isBlank?: boolean;
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
    { name: "커피우유", price: 1400 },
    { name: "몬스터드링크", price: 1400 },
    { name: "사과주스", price: 1000 }
];

const $balanceOutput = document.querySelector<HTMLDivElement>(".balance");
const $menuBtnWrapper = document.querySelector<HTMLDivElement>(".menu-btn-wrapper");
const $warningContent = document.querySelector<HTMLDivElement>(".warning-box.menu");

let balanceValue = 0;

const drawMenuButtons = () => {
    const $menuWrapper = document.querySelector<HTMLDivElement>(".menu-btn-wrapper");
    const $buttonTemplate = document.querySelector<HTMLTemplateElement>(".button-template");

    if (!($menuWrapper instanceof HTMLDivElement) || !($buttonTemplate instanceof HTMLTemplateElement)) return;

    if (menuItems.length % 3 !== 0) {
        appendBlankButtons(3 - menuItems.length % 3);
    }

    for (const menu of menuItems) {
        const $template = document.importNode($buttonTemplate.content, true);
        const $name = $template.querySelector(".menu-name") as HTMLParagraphElement;
        const $price = $template.querySelector(".price") as HTMLParagraphElement;
        
        $name.innerText = menu.name;
        $price.innerText = menu.isBlank ? "" : `${menu.price}원`;

        $menuWrapper.appendChild($template);
        ($menuWrapper.lastElementChild as HTMLButtonElement).disabled = menu.isBlank ? true : false;
    }
}

const appendBlankButtons = (count: number) => {
    const blankMenu = {
        name: "",
        price: 0,
        isBlank: true
    };

    for (let i = 0; i < count; i++) {
        menuItems.push(blankMenu);
    }
}

drawMenuButtons();

$menuBtnWrapper?.addEventListener("mousedown", (e: MouseEvent) => {
    if (!$balanceOutput) return;
    
    const menu: Menu | null = getMenuInfo(e);

    
    if (menu) {
        balanceValue = convertLocaleTextToNum($balanceOutput.innerText);

        if (menu.price > balanceValue) {
            $balanceOutput.innerText = menu.price.toLocaleString();
        }
    }
});

$menuBtnWrapper?.addEventListener("mouseup", (e: MouseEvent) => {
    if (!$balanceOutput) return;
    const menu: Menu | null = getMenuInfo(e);
    
    if (menu) {
        if (menu.price > balanceValue) {
            $balanceOutput.innerText = balanceValue.toLocaleString();
            setWarning("잔액이 부족합니다.");
        } else {
            buy(menu);
        }
    }
});

const getMenuInfo = (e: MouseEvent): Menu | null => {
    const $target = e.target;    

    if ($target instanceof HTMLElement) {
        const $menuButton = $target.closest(".menu-item");

        if ($menuButton) {
            const $menu = $menuButton.querySelector(".menu-name");
            const $price = $menuButton.querySelector(".price");
            
            if ($menu instanceof HTMLParagraphElement && $price instanceof HTMLParagraphElement) {
                return {
                    name: $menu.innerText,
                    price: Number($price.innerText.replace("원", ""))
                };
            }
        }
    }

    return null;
}

const buy = (menu: Menu) => {
    const balance = convertLocaleTextToNum($balanceOutput!.innerText) - menu.price;
    $balanceOutput!.innerText = balance.toLocaleString();

    clearWarning();
    publishLogEvent({
        type: LogType.BUY,
        menuName: menu.name
    });
}

const setWarning = (message: string) => {
    if ($warningContent) $warningContent.innerText = message;
}

const clearWarning = () => {
    if ($warningContent) $warningContent.innerText = "";
}