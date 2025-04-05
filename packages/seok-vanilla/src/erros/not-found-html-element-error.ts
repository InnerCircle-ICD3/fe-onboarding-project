export const NOT_FOUND_HTML_ELEMENT_ERROR = "NotFoundHTMLElementError";

export class NotFoundHTMLElementError extends Error {
  constructor(selector: string) {
    super(`Cannot find HTML element with selector: ${selector}`);
    this.name = NOT_FOUND_HTML_ELEMENT_ERROR;
  }
}
