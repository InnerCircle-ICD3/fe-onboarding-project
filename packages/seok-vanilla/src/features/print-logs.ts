import { NotFoundHTMLElementError } from "../erros/NotFoundHTMLElementError";

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
  $logList.querySelectorAll("li").forEach((li) => li.remove());
  logs.forEach((log) => {
    const li = document.createElement("li");
    li.classList.add(log.type);
    li.innerHTML = log.message;
    $logList.append(li);
  });
  $logList.scrollTo({
    top: $logList.scrollHeight,
    behavior: "smooth",
  });
}
