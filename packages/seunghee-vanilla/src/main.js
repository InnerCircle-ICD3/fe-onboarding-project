import "./style.css";

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
  const container = document.getElementById("md-container");
  container.innerHTML = "";

  mds.forEach((md) => {
    const button = document.createElement("button");
    button.textContent = `${md.name} - ${md.price}원`;

    container.appendChild(button);
  });
}

renderMdButtons();
