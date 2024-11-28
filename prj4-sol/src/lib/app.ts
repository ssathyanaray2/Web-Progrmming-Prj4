import { Errors } from 'cs544-js-utils';

import * as Lib from 'library-types';

import {
  NavLinks,
  LinkedResult,
  PagedEnvelope,
  SuccessEnvelope,
} from './response-envelopes.js';

import { makeLibraryWs, LibraryWs } from './library-ws.js';

import { makeElement, makeQueryUrl } from './utils.js';

export default function makeApp(wsUrl: string) {
  return new App(wsUrl);
}

class App {
  private readonly wsUrl: string;
  private readonly ws: LibraryWs;

  private readonly result: HTMLElement;
  private readonly errors: HTMLElement;

  constructor(wsUrl: string) {
    this.wsUrl = wsUrl;
    this.ws = makeLibraryWs(wsUrl);

    this.result = document.querySelector('#result')!;
    this.errors = document.querySelector('#errors')!;

    const searchInput = document.querySelector<HTMLInputElement>('#search');
    if (searchInput) {
      this.addEnterKeyListener(searchInput, () => {
        this.handleSearch(new Event('submit') as SubmitEvent);
      });
    }
  }

  private addEnterKeyListener(element: HTMLElement, callback: () => void) {
    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        callback();
      }
    });
  }

  
  private async handleSearch(event: SubmitEvent) {
    event.preventDefault(); 
    this.clearErrors(); 
    this.result.innerHTML = ''; 

    const searchInput = document.querySelector<HTMLInputElement>('#search');
    if (!searchInput || !searchInput.value.trim()) {
      this.displayError('search', 'Search field cannot be empty.');
      return;
    }

    const query = searchInput.value.trim();
    const searchUrl = makeQueryUrl(`${this.wsUrl}/api/books`, { search: query });
    console.log(searchUrl);

    const result = await this.ws.findBooksByUrl(searchUrl);

    if (result.isOk) {
      const envelope = result.val;
      if (envelope.result.length > 0) {
        this.displayBooksWithPagination(envelope);
      } else {
        this.result.innerHTML = '<p>No books found.</p>';
      }
    } else {
      console.log("error");
    }
  }

  private displayBooksWithPagination(envelope: PagedEnvelope<Lib.XBook>) {
    const books = envelope.result;
  
    this.result.innerHTML = '';

    const paginationbefore = this.createPagination(envelope.links);
    this.result.appendChild(paginationbefore);
  
    const list = makeElement('ul');
  
    books.forEach((book) => {
      const li = makeElement('li', {
        style: 'margin-bottom: 10px; display: flex; align-items: center;',
      });
  
      const titleSpan = makeElement(
        'span',
        {
          style: 'flex-grow: 1;', 
        },
        book.result.title
      );
  
      const detailsLink = makeElement(
        'a',
        {
          href: '#',
          style: 'margin-left: 20px; text-decoration: underline; color: blue;',
        },
        'details...'
      );
      detailsLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        this.showBookDetails(book);
      });
  
      li.append(titleSpan, detailsLink);
      list.append(li);
    });

    this.result.appendChild(list);
  
    const paginationafter = this.createPagination(envelope.links);
    this.result.appendChild(paginationafter);
  }
  
  private createPagination(links: NavLinks): HTMLElement {
    console.log(links);
    const paginationContainer = makeElement('div', { 
      class: 'pagination', 
      style: 'display: flex; justify-content: space-between; align-items: center; width: 100%;' 
  });
  
    const prevButton = makeElement(
      'button',
      {
        style: 'all: unset; color: blue; text-decoration: underline; cursor: pointer;',
        ...(links.prev ? {} : { disabled: 'true' }), 
      },
      '<<'
    );
    if (links.prev) {
      prevButton.addEventListener('click', async () => {
        const result = await this.ws.findBooksByUrl(links.prev?.href);
        if (result.isOk) {
          this.displayBooksWithPagination(result.val);
        } else {
          console.log("error");
          // this.displayErrors(result.errors);
        }
      });
    }
    paginationContainer.appendChild(prevButton);
  
    const nextButton = makeElement(
      'button',
      {
        style: 'all: unset; color: blue; text-decoration: underline; cursor: pointer;',
        ...(links.next ? {} : { disabled: 'true' }), 
      },
      '>>'
    );
    
    if (links.next) {
      nextButton.addEventListener('click', async () => {
        const result = await this.ws.findBooksByUrl(links.next?.href);
        if (result.isOk) {
          this.displayBooksWithPagination(result.val);
        } else {
          console.log("error");
          // this.displayErrors(result.errors);
        }
      });
    }
    paginationContainer.appendChild(nextButton);
  
    return paginationContainer;
  }
  
  private async showBookDetails(book: any) {
    const bookUrl = book.links.self.href;
    const result = await this.ws.getBookByUrl(bookUrl);

    const bookDetails = this.unwrap(result);
    if (bookDetails) {
      this.displayBookDetails(bookDetails.result);
    }
  }

  private displayBookDetails(book: Lib.XBook) {
    this.result.innerHTML = ''; 

    const details = makeElement('div');
    details.append(
      makeElement('p', {}, `ISBN: ${book.isbn}`),
      makeElement('p', {}, `Title: ${book.title}`),
      makeElement('p', {}, `Authors: ${book.authors.join(', ')}`),
      makeElement('p', {}, `Number of Pages: ${book.pages}`),
      makeElement('p', {}, `Publisher: ${book.publisher}`),
      makeElement('p', {}, `Number of Copies: ${book.nCopies}`),
      makeElement('p', {}, `Borrowers:`)
    );

    //spoorthi
    //We need to add code here for checkout and return 
    this.result.append(details);
  } 

  private unwrap<T>(result: Errors.Result<T>) {
    if (result.isOk === false) {
      this.displayErrors(result.errors);
    } else {
      return result.val;
    }
  }

  /**
   * Display errors for a specific field
   */
  private displayError(fieldId: string, message: string) {
    const fieldError = document.querySelector(`#${fieldId}-error`);
    if (fieldError) {
      fieldError.textContent = message;
    } else {
      this.errors.appendChild(
        makeElement('li', { class: 'error' }, message)
      );
    }
  }

  /**
   * Clear out all errors
   */
  private clearErrors() {
    this.errors.innerHTML = '';
    document.querySelectorAll('.error').forEach((el) => {
      el.textContent = '';
    });
  }

  /**
   * Display errors in the errors section or on specific fields
   */
  private displayErrors(errors: Errors.Err[]) {
    for (const err of errors) {
      const id = err.options.widget ?? err.options.path;
      if (id) {
        this.displayError(id, err.message);
      } else {
        const li = makeElement('li', { class: 'error' }, err.message);
        this.errors.appendChild(li);
      }
    }
  }
}
