export function warn(message: string) {
  const alertMessage = document.createElement("div");
  alertMessage.setAttribute("role", "alert");
  alertMessage.textContent = message;
  alertMessage.classList.add("alert-message");
  document.body.appendChild(alertMessage);

  setTimeout(() => {
    alertMessage.remove();
  }, 3000);
}
