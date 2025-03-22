interface menu {
  name: string;
  price: number;
}

const menus = [
  {name: "콜라", price: 1500},
  {name: "속이사이다", price: 1700},
  {name: "판타지판타", price: 1500},
  {name: "오뎅국물", price: 1800},
  {name: "부장라떼", price: 800},
  {name: "판타지판타", price: 1500},
  {name: "레드뿔", price: 2500},
  {name: "핫세븐", price: 1900},
  {name: "커피우유", price: 1400}
]

function drawMenuButtons() {
  const menuWrapper = document.getElementsByClassName("menu-wrapper")[0];

  menus.forEach(menu => {
    const menuBtn = document.createElement("button");
    menuBtn.textContent = menu.name;
    menuBtn.className = "menu-item";
    menuWrapper.appendChild(menuBtn);
  });
}

window.onload = () => {
  drawMenuButtons();
}