import { Errors } from 'cs544-js-utils';

// Types defined in library.ts in earlier projects
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

    // Fetch books from the backend
    const result = await this.ws.findBooksByUrl(searchUrl);

    // Handle the result
    if (result.isOk) {
      const envelope = result.val;
      if (envelope.result.length > 0) {
        console.log(envelope);
        this.displayBooksWithPagination(envelope);
      } else {
        this.result.innerHTML = '<p>No books found.</p>';
      }
    } else {
      console.log(result);
      // this.displayErrors(result.errors);
    }
  }

  private displayBooksWithPagination(envelope: PagedEnvelope<Lib.XBook>) {
    const books = envelope.result;
  
    // Clear previous results
    this.result.innerHTML = '';
  
    // Create book list container
    const list = makeElement('ul');
  
    // Add each book to the list
    books.forEach((book) => {
      // Create book item container
      const li = makeElement('li', {
        style: 'margin-bottom: 10px; display: flex; align-items: center;',
      });
  
      // Create book title element
      const titleSpan = makeElement(
        'span',
        {
          style: 'flex-grow: 1;', // Push the details link to the right
        },
        book.result.title
      );
  
      // Add details button/link
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

  
    console.log(this.result);
    this.result.appendChild(list);
  
    // Pagination navigation
    // const pagination = this.createPagination(envelope.links);
    // this.result.appendChild(pagination);
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
    this.result.innerHTML = ''; // Clear previous content

    // Create and append detailed book information
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

    // const borrowersList = makeElement('ul');
    // book.borrowers.forEach((borrower) => {
    //   const borrowerLi = makeElement('li', {}, borrower.name);

    //   // Add return book button
    //   const returnButton = makeElement('button', {}, 'Return Book');
    //   returnButton.addEventListener('click', () =>
    //     this.returnBook(book.isbn, borrower.id)
    //   );

    //   borrowerLi.append(returnButton);
    //   borrowersList.append(borrowerLi);
    // });

    // details.append(borrowersList);

    // // Add checkout functionality
    // const patronIdInput = makeElement('input', {
    //   id: 'patron-id',
    //   placeholder: 'Patron ID',
    // }) as HTMLInputElement;
    // const checkoutButton = makeElement('button', {}, 'Checkout Book');
    // checkoutButton.addEventListener('click', () =>
    //   this.checkoutBook(book.isbn, patronIdInput.value)
    // );

    // details.append(
    //   makeElement('p', {}, 'Patron ID: '),
    //   patronIdInput,
    //   checkoutButton
    // );

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
