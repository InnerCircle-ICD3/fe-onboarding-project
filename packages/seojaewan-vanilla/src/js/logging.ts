const addLogging = (message: string) => {
    const logsElement = document.querySelector(".log--list") as HTMLDivElement;
    const logElement = document.createElement('li');

    logElement.textContent = message;
    logElement.classList.add("log--item");

    logsElement.appendChild(logElement);
    
    logElement.scrollIntoView({ behavior: "smooth" });
}

export default addLogging;