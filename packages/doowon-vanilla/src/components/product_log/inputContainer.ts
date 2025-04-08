export class InputContainer {
    render(): HTMLDivElement {
        const container = document.createElement("div");
        container.className = "flex flex-col items-center justify-center w-40 h-20 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded";
        return container;
    }
}