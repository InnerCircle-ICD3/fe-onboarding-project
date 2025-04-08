import { InputButton } from "./inputButton";
import { InputForm } from "./inputForm";
import { ReturnButton } from "./returnButton";

export class LogContainer {
  onChange = (e: Event) => {
    // You may want to add some logic here
    const target = e.target as HTMLTextAreaElement;
    console.log(target.value);
  };

  render(): HTMLDivElement {
    // 로그 컨테이너 생성
    const logContainer = document.createElement("div");
    logContainer.id = "log-container";
    logContainer.className = "col-span-2 flex flex-col gap-4 bg-gray-200 h-full";

    const header = document.createElement("div");
    header.className = "flex flex-row gap-4 items-center";
    logContainer.appendChild(header);

    const body = document.createElement("div");
    body.className = "flex-grow";
    logContainer.appendChild(body);

    const inputForm = new InputForm().render();
    const inputButton = new InputButton().render();
    const returnButton = new ReturnButton().render();
    inputForm.classList.add("w-1/2"); // 50% width (2/4)
    inputButton.classList.add("w-1/4"); // 25% width (1/4)
    returnButton.classList.add("w-1/4"); // 25% width (1/4)
    header.appendChild(inputForm);
    header.appendChild(inputButton);
    header.appendChild(returnButton);

    return logContainer;
  }
}
