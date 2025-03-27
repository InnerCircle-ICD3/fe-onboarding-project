import "./style.css";

let insertedMoney = 0;
let isMdPriceShown = false;

const mds = [
  { name: "콜라", price: 1500 },
  { name: "사이다", price: 1700 },
  { name: "환타", price: 2000 },
  { name: "포카리", price: 1300 },
  { name: "게토레이", price: 1800 },
  { name: "밀키스", price: 1600 },
  { name: "레쓰비", price: 1900 },
  { name: "코카콜라", price: 2500 },
  { name: "펩시", price: 2500 },
  { name: "마운틴듀", price: 2500 },
  { name: "스프라이트", price: 2500 },
  { name: "토레타", price: 2500 },
  { name: "페리에", price: 2500 },
  { name: "맥콜", price: 2500 },
];

function renderMdButtons() {
  const mdContainer = document.querySelector(".md-container");
  const mdButtons = mdContainer.children;

  for (let i = 0; i < mdButtons.length; i++) {
    const mdButton = mdButtons[i];
    const md = mds[i];

    const moneyPresenter = document.querySelector(".inserted-money-presenter");

    mdButton.innerHTML = `<h3>${md.name}</h3><p>${md.price}원</p>`;

    mdButton.addEventListener("mousedown", (ev) => {
      if (insertedMoney < md.price) {
        moneyPresenter.innerText = convertNumToStrForDisplay(md.price);
        isMdPriceShown = true;
        return;
      }

      insertedMoney -= md.price;
    });
    mdButton.addEventListener("mouseup", (ev) => {
      moneyPresenter.innerText = convertNumToStrForDisplay(insertedMoney);

      if (isMdPriceShown) {
        isMdPriceShown = false;
      } else {
        addLog(`${md.name}을(를) 구매했습니다.`);
      }
    });
  }
}

function renderInsertedMoney() {
  const moneyPresenter = document.querySelector(".inserted-money-presenter");
  const moneyInput = document.querySelector("#money-input");

  const inputButton = document.querySelector(".input-btn");
  inputButton.addEventListener("click", () => {
    const money = moneyInput.valueAsNumber;

    if (!isNaN(money) && money >= 0) {
      insertedMoney += money;
      moneyPresenter.innerText = convertNumToStrForDisplay(insertedMoney);
    }

    moneyInput.value = 0;

    if (money !== 0) {
      addLog(`${convertNumToStrForDisplay(money)}원을 넣었습니다.`);
    }
  });
}

function renderReturnButton() {
  const returnBtn = document.querySelector(".return-btn");
  const moneyPresenter = document.querySelector(".inserted-money-presenter");

  returnBtn.addEventListener("click", () => {
    if (insertedMoney === 0) {
      return;
    }

    const insertedMoneyStr = moneyPresenter.innerText;
    addLog(`${insertedMoneyStr}원을 반환합니다.`);

    moneyPresenter.innerText = "0";
    insertedMoney = 0;
  });
}

function addLog(message) {
  const userLogger = document.querySelector(".user-logger");

  const log = document.createElement("div");
  log.innerText = message;

  userLogger.appendChild(log);
  userLogger.scrollTop = userLogger.scrollHeight;
}

function convertNumToStrForDisplay(number) {
  return number.toLocaleString();
}

renderMdButtons();
renderInsertedMoney();
renderReturnButton();
