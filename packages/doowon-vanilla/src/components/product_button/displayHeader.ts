export class DisplayHeader {
  render(): HTMLDivElement {
    const header = document.createElement("div");
    header.className =
      "p-4 mb-4 rounded bg-white flex text-gray-700 items-center justify-center";

    const displayContainer = document.createElement("div");
    displayContainer.textContent = "15000";
    displayContainer.classList.add("text-3xl", "font-bold");

    header.appendChild(displayContainer);
    return header;
  }
}
