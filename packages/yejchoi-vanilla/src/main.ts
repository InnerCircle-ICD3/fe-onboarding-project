interface Product {
    name : string;
    price : number;
    id : string;
}

let totalAmount = 0;

// 금액 표시창 관리 영역
const totalAmountElement = document.querySelector(".total-amount") as HTMLDivElement

const updateTotalAmount = (value : number) => {
    totalAmountElement.textContent = value.toLocaleString()
}

// 로그 기록 함수 처리
const logBoxElement = document.querySelector(".log-box") as HTMLDivElement

const addLog = (message : string, state?: string) => {
    const logElement = document.createElement("div");

    logElement.className = `${state === 'error' ? 'error' : ''} log-message`;
    logElement.textContent = message;
    logBoxElement.appendChild(logElement);
    logBoxElement.scrollTop = logBoxElement.scrollHeight;
}

// 금액 투입 처리
const insertButtonElement = document.querySelector('#insert-button') as HTMLButtonElement
const amountInputElement = document.querySelector(".amount-inner-input") as HTMLInputElement;

insertButtonElement.addEventListener("click", () => {
    const value = Number(amountInputElement.value);

    if(value <= 0) {
        addLog('1원 이상 투입해주세요', 'error')
        return
    }

    totalAmount += value;
    updateTotalAmount(totalAmount)
    amountInputElement.value = '0';
    addLog(`${value.toLocaleString()}원 투입`);
})

// 반환 버튼 로직 처리
const returnButtonElement = document.querySelector<HTMLButtonElement>('#return-button');

returnButtonElement?.addEventListener('click', () => {
    const balance = totalAmount;

    if(totalAmount <= 0) {
        addLog(`반환할 잔액이 없습니다.`, 'error');

        return;
    }

    totalAmount = 0;
    updateTotalAmount(0);
    amountInputElement.value = '0';
    addLog(`${balance.toLocaleString()}원 반환`);
})


// 상품버튼 클릭 이벤트
const handleProductButton = (product : Product) => {
    const productButtonElement = document.querySelector(`#product-${product.id}`) as HTMLButtonElement

    productButtonElement.addEventListener("mousedown", () => {
        if(totalAmount < product.price) {
            totalAmountElement.textContent = product.price.toLocaleString();
        } else {
            totalAmount -= product.price;
            addLog(`${product.name} 구매 (${product.price.toLocaleString()}원 차감)`);
        }
    })

    productButtonElement.addEventListener('mouseup', () => {
        updateTotalAmount(totalAmount)
    })
}

// 상품버튼 표출 영역
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

