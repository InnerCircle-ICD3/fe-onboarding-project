export const addLog = (log) => {
  const $vendingMachineLogBox = document.querySelector(".vending-machine-log-box");
  const $log = document.createElement("p");
  $log.textContent = log;
  $vendingMachineLogBox.appendChild($log);
};

export const clearLogs = () => {
  const $vendingMachineLogBox = document.querySelector(".vending-machine-log-box");
  $vendingMachineLogBox.innerHTML = "";
};
