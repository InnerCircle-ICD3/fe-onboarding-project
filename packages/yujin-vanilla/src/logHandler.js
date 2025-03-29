export const addLog = (message) => {
  const logList = document.querySelector(".log-list");
  const li = document.createElement("li");
  li.textContent = message;
  logList.appendChild(li);
  scrollToBottom();
};

export const scrollToBottom = () => {
  const logContainer = document.querySelector(".log");
  logContainer.scrollTop = logContainer.scrollHeight;
};
