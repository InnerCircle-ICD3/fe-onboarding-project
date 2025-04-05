import { NotFoundHTMLElementError } from "../erros/not-found-html-element-error";

type Log = {
  type: "info" | "error";
  message: string;
  timestamp: string;
};

let logs: Log[] = [];
let $logList = document.querySelector<HTMLUListElement>("#log-list");

export function addLog(type: Log["type"], message: string) {
  logs.push({ type, message, timestamp: new Date().toISOString() });
  printLogs();
}

export function printLogs() {
  if (!$logList) {
    throw new NotFoundHTMLElementError("#log-list");
  }
  $logList.innerHTML = "";

  const fragment = document.createDocumentFragment();
  logs.forEach((log) => {
    const li = document.createElement("li");
    li.classList.add(log.type);
    li.textContent = log.message;
    fragment.append(li);
  });
  $logList.append(fragment);
  $logList.scrollTo({
    top: $logList.scrollHeight,
    behavior: "smooth",
  });
}
