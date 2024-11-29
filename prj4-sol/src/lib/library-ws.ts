import { Errors } from 'cs544-js-utils';
import { SuccessEnvelope, PagedEnvelope, ErrorEnvelope, isErrorEnvelope, isSuccessEnvelope, isPagedEnvelope } from './response-envelopes.js';
import * as Lib from 'library-types';

/**
 * Create a Library Web Services wrapper instance.
 * @param url The base URL for the web services.
 * @returns An instance of `LibraryWs`.
 */
export function makeLibraryWs(url: string) {
  return new LibraryWs(url);
}

export class LibraryWs {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  /**
   * Fetch details of a book using its URL.
   * @param bookUrl The URL of the book resource.
   * @returns A Result containing the book details or an error.
   */
  async getBookByUrl(bookUrl: URL | string): Promise<Errors.Result<SuccessEnvelope<Lib.XBook>>> {
    return await getEnvelope<Lib.XBook, SuccessEnvelope<Lib.XBook>>(bookUrl);
  }

  /**
   * Search for books using a query URL.
   * @param findUrl The URL containing search query parameters.
   * @returns A Result containing paginated books or an error.
   */
  async findBooksByUrl(findUrl: URL | string): Promise<Errors.Result<PagedEnvelope<Lib.XBook>>> {
    return await getEnvelope<Lib.XBook, PagedEnvelope<Lib.XBook>>(findUrl);
  }

  /**
   * Checkout a book for a patron.
   * @param lend The lending details containing the book and patron info.
   * @returns A Result indicating success or an error.
   */
  async checkoutBook(lend: Lib.Lend): Promise<Errors.Result<void>> {
    const url = `${this.url}/lendings`;
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lend),
    };
    return await fetchJson<void>(url, options);
  }

  /**
   * Return a previously checked-out book.
   * @param lend The lending details containing the book and patron info.
   * @returns A Result indicating success or an error.
   */
  async returnBook(lend: Lib.Lend): Promise<Errors.Result<void>> {
    const url = `${this.url}/lendings`;
    const options: RequestInit = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lend),
    };
    return await fetchJson<void>(url, options);
  }

  /**
   * Get all lendings of a specific book by ISBN.
   * @param isbn The ISBN of the book.
   * @returns A Result containing a list of lendings or an error.
   */
  async getLends(isbn: string): Promise<Errors.Result<Lib.Lend[]>> {
    const url = new URL(`${this.url}/lendings`);
    url.searchParams.append('findBy', 'isbn');
    url.searchParams.append('isbn', isbn);
    return await fetchJson<Lib.Lend[]>(url);
  }

  /**
   * Get all lendings by a specific patron ID.
   * @param patronId The ID of the patron.
   * @returns A Result containing a list of lendings or an error.
   */
  async getLendsByPatron(patronId: string): Promise<Errors.Result<Lib.Lend[]>> {
    const url = new URL(`${this.url}/lendings`);
    url.searchParams.append('findBy', 'patronId');
    url.searchParams.append('patronId', patronId);
    return await fetchJson<Lib.Lend[]>(url);
  }
}

/**
 * Fetch an envelope response (Success or Paged) from the backend.
 * @param url The URL of the resource.
 * @returns A Result containing the envelope or an error.
 */
async function getEnvelope<T, T1 extends SuccessEnvelope<T> | PagedEnvelope<T>>(
  url: URL | string
): Promise<Errors.Result<T1>> {
  const result = await fetchJson<T1 | ErrorEnvelope>(url);

  if (result.isOk) {
    const envelope = result.val;

    // Check if the response is an error envelope
    if (isErrorEnvelope(envelope)) {
      return Errors.errResult(envelope.errors.map(err => err.message).join(', '));
    }

    // Return the successfully parsed envelope
    return Errors.okResult(envelope as T1);
  }

  return result as Errors.Result<T1>;
}

/**
 * Generic fetch wrapper with JSON parsing and error handling.
 * @param url The URL for the fetch request.
 * @param options Fetch options (method, headers, body, etc.).
 * @returns A Result containing the parsed response or an error.
 */
async function fetchJson<T>(url: URL | string, options: RequestInit = { method: 'GET' }): Promise<Errors.Result<T>> {
  try {
    const response = await fetch(url.toString(), options);

    if (!response.ok) {
      return Errors.errResult(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const json = await response.json();
    return Errors.okResult(json as T);
  } catch (error) {
    console.error(`Fetch failed: ${error}`);
    return Errors.errResult(`Failed to fetch from ${url}: ${error}`);
  }
}
