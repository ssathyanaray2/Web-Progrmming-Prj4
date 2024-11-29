import { Errors } from 'cs544-js-utils';

/**
 * Create and return a new DOM element.
 * @param tagName The tag name for the element (e.g., 'div', 'p', 'ul').
 * @param attrs An object containing attributes to set on the element.
 * @param appendees Elements or text to append as children of the created element.
 * @returns The created DOM element.
 */
export function makeElement(
  tagName: string,
  attrs: { [attr: string]: string } = {},
  ...appendees: (string | HTMLElement)[]
): HTMLElement {
  const element = document.createElement(tagName);
  for (const [k, v] of Object.entries(attrs)) {
    element.setAttribute(k, v);
  }
  element.append(...appendees);
  return element;
}

/**
 * Create a URL object by appending query parameters to a base URL.
 * @param baseUrl The base URL string.
 * @param req An object representing key-value pairs for query parameters.
 * @returns A URL object with the query parameters appended.
 */
export function makeQueryUrl(baseUrl: string, req: Record<string, string>): URL {
  const url = new URL(baseUrl);
  Object.entries(req).forEach(([k, v]) => url.searchParams.append(k, v));
  return url;
}

/**
 * Extract key-value pairs from a form, filtering out empty fields.
 * @param form The form element to extract data from.
 * @returns An object containing non-empty form data as key-value pairs.
 */
export function getFormData(form: HTMLFormElement): Record<string, string> {
  const pairs = [...new FormData(form).entries()]
    .map(([k, v]) => [k, v as string])
    .filter(([_, v]) => v.trim().length > 0);
  return Object.fromEntries(pairs);
}

/**
 * Display errors in a designated errors container.
 * @param errorsContainer The DOM element to contain error messages.
 * @param errors An array of error messages to display.
 */
export function displayErrors(errorsContainer: HTMLElement, errors: Errors.Err[]): void {
  errorsContainer.innerHTML = ''; // Clear previous errors
  errors.forEach((err) => {
    const errorItem = makeElement('li', { class: 'error' }, err.message);
    errorsContainer.appendChild(errorItem);
  });
}

/**
 * Clear all error messages from a designated container.
 * @param errorsContainer The DOM element to clear error messages from.
 */
export function clearErrors(errorsContainer: HTMLElement): void {
  errorsContainer.innerHTML = '';
}

/**
 * Create a button with a specified label and click handler.
 * @param label The text displayed on the button.
 * @param onClick The function to execute when the button is clicked.
 * @returns The created button element.
 */
export function makeButton(label: string, onClick: () => void): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = label;
  button.addEventListener('click', onClick);
  return button;
}
