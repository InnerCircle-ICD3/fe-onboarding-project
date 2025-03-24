export const renderLog = (message) => {
  const logContainer = document.querySelector(
    '.log-message-container > div'
  );

  const logItem = document.createElement('div');
  logItem.className = 'p-1 border-gray-200 text-sm';
  logItem.textContent = `${message}`;
  logContainer?.appendChild(logItem);
};
