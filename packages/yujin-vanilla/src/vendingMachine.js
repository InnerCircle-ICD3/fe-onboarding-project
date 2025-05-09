import { setCurrencyToWon, getNumericValue } from "./numberInput.js";
import { addLog } from "./logHandler.js";

const products = [
  { name: "콜라", price: 1500 },
  { name: "속이사이다", price: 1700 },
  { name: "판타지판타", price: 1500 },
  { name: "오뎅국물", price: 1800 },
  { name: "부장라떼", price: 800 },
  { name: "판타지판타", price: 1500 },
  { name: "레드뿔", price: 2500 },
  { name: "핫세븐", price: 1900 },
  { name: "커피우유", price: 1400 },
  { name: "초코우유", price: 1400 },
  { name: "바나나우유", price: 1400 },
  { name: "", price: "" },
];

let total = 0;
const buttonsContainer = document.querySelector(".buttons");
if (buttonsContainer) {
  buttonsContainer.addEventListener("click", (event) => {
    if (event.target.id === "button-insert") {
      handleInsert();
    } else if (event.target.id === "button-refund") {
      handleRefund();
    }
  });
}

export const resetCount = () => {
  total = 0;
}

export const renderProducts = () => {
  const container = document.querySelector(".products");

  products.forEach((item) => {
    const button = document.createElement("button");
    button.className = "product";

    if (item.name && item.price) {
      const title = document.createElement("span");
      title.className = "product-title";
      title.textContent = item.name;

      const price = document.createElement("span");
      price.className = "product-price";
      price.textContent = `${item.price}원`;

      button.appendChild(title);
      button.appendChild(price);
    } else {
      button.disabled = true;
    }

    container.appendChild(button);
  });
};

export const handleInsert = () => {
    const numberInput = document.querySelectorAll(".number-input");

    const depositAmount = getNumericValue(numberInput[1]);
    if (!depositAmount) return;

    total += depositAmount;
    numberInput[0].value = setCurrencyToWon(total);
    numberInput[1].value = "0";

    addLog(
      `${setCurrencyToWon(depositAmount)}원을 투입했습니다.`
    );
};

export const handleRefund = () => {
    const numberInput = document.querySelectorAll(".number-input");

    if (total === 0) return;
    
    addLog(
      `${setCurrencyToWon(total)}원이 반환되었습니다.`
    );
    total = 0;
    numberInput[0].value = "0";
};
