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
    const url = `${this.url}/api/lendings`; // Ensure `/api` is included
    const options: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }, // Ensure proper Content-Type
      body: JSON.stringify(lend), // Serialize the lend object to JSON
    };
  
    try {
      console.log('Checkout URL:', url);
      console.log('Request options:', options);
  
      const result = await fetchJson<void>(url, options);
  
      if (result.isOk) {
        console.log('Checkout successful:', result);
      } else {
        console.error('Error during checkout:', result);
      }
  
      return result;
    } catch (error) {
      console.error('Unexpected error during checkout:', error);
      return Errors.errResult('Unexpected error during checkout.');
    }
  }  

  /**
 * Return a previously checked-out book.
 * @param lend The lending details containing the book and patron info.
 * @returns A Result indicating success or an error.
 */
  async returnBook(lend: Lib.Lend): Promise<Errors.Result<void>> {
    const url = `${this.url}/api/lendings`; // Corrected to include `/api`
    const options: RequestInit = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }, // Ensure proper Content-Type
      body: JSON.stringify(lend), // Serialize the lend object to JSON
    };

    try {
      console.log('Return URL:', url);
      console.log('Request options:', options);

      const result = await fetchJson<void>(url, options);

      if (result.isOk) {
        console.log('Return successful:', result);
      } else {
        console.error('Error during return:', result);
      }

      return result;
    } catch (error) {
      console.error('Unexpected error during return:', error);
      return Errors.errResult('Unexpected error during return.');
    }
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

async function fetchJson<T>(url: URL | string, options: RequestInit = { method: 'GET' }): Promise<Errors.Result<T>> {
  try {
    console.log(`Fetching URL: ${url}`, options);
    const response = await fetch(url.toString(), options);

    if (!response.ok) {
      const text = await response.text();
      console.error(`HTTP error ${response.status}: ${response.statusText}`);
      console.error('Error response body:', text);
      return Errors.errResult(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const json = await response.json();
      console.log('Successful response:', json); // Debug the JSON response
      return Errors.okResult(json as T);
    } else {
      const text = await response.text();
      console.error('Unexpected content type:', contentType);
      console.error('Response body:', text);
      return Errors.errResult('Unexpected response type.');
    }
  } catch (error) {
    console.error('Fetch failed:', error);
    return Errors.errResult(`Failed to fetch from ${url}: ${error}`);
  }
}
