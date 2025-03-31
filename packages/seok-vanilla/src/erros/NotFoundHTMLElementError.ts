export const NOT_FOUND_HTML_ELEMENT_ERROR = "NotFoundHTMLElementError";

export class NotFoundHTMLElementError extends Error {
  constructor(message: string) {
    super(message);
    this.name = NOT_FOUND_HTML_ELEMENT_ERROR;
  }
}
