export class InputButton {
  render(): HTMLButtonElement {
    const button = document.createElement("button");
    button.className =
      "flex flex-col items-center justify-center w-40 h-20 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded";

    const nameSpan = document.createElement("span");
    nameSpan.className = "text-lg";
    nameSpan.textContent = "투입";

    button.appendChild(nameSpan);

    return button;
  }
}
