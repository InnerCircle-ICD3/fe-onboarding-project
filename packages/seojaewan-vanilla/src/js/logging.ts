import checkInstance from "./checkType";

const addLogging = (message: string) => {
    const logListElement = document.querySelector(".log--list");
    const templateElement = document.querySelector("#log--template");

    if(!checkInstance(logListElement, HTMLUListElement) || !checkInstance(templateElement, HTMLTemplateElement)) return;

    const clone = document.importNode(templateElement.content, true);
    const logItemElement = clone.querySelector(".log--item");

    if(!checkInstance(logItemElement, HTMLSpanElement)) return;

    logItemElement.textContent = message;
    logListElement.appendChild(clone);
    
    logItemElement.scrollIntoView({ behavior: "smooth" });
}

export default addLogging;