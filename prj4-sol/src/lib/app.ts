import { Errors } from 'cs544-js-utils';
import * as Lib from 'library-types';
import { NavLinks, LinkedResult, PagedEnvelope, SuccessEnvelope } from './response-envelopes.js';
import { makeLibraryWs, LibraryWs } from './library-ws.js';
import { makeElement, makeQueryUrl } from './utils.js';

export default function makeApp(wsUrl: string) {
  return new App(wsUrl);
}

interface BookWithBorrowers extends Lib.XBook {
  borrowers?: Array<{
    id: string;
    name: string;
  }>;
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

  /**
   * Adds an Enter key listener to a specified element.
   */
  private addEnterKeyListener(element: HTMLElement, callback: () => void) {
    element.addEventListener('keydown', (event) => {
      if ((event as KeyboardEvent).key === 'Enter') {
        event.preventDefault();
        callback();
      }
    });
  }

  /**
   * Handles the search functionality by querying the API and displaying results.
   */
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
    const result: Errors.Result<PagedEnvelope<Lib.XBook>> = await this.ws.findBooksByUrl(searchUrl);

    if (result.isOk) {
        // This is an OkResult, safely access `result.val`.
        const envelope = result.val;
        if (envelope.result.length > 0) {
            this.displayBooksWithPagination(envelope);
        } else {
            this.result.innerHTML = '<p>No books found.</p>';
        }
    } else {
        // This is an ErrResult, safely access `errors`.
        const errResult = result as Errors.ErrResult; // Explicitly narrow to ErrResult.
        this.displayErrors(errResult.errors);
    }
  }

  /**
   * Displays books with pagination controls.
   */
  private displayBooksWithPagination(envelope: PagedEnvelope<Lib.XBook>) {
    const books = envelope.result;

    // Clear previous results
    this.result.innerHTML = '';

    // Create book list container
    const list = makeElement('ul');

    // Add each book to the list
    books.forEach((book) => {
      const li = makeElement('li', {
        style: 'margin-bottom: 10px; display: flex; align-items: center;',
      });

      const titleSpan = makeElement('span', { style: 'flex-grow: 1;' }, book.result.title);
      const detailsLink = makeElement(
        'a',
        { href: '#', style: 'margin-left: 20px; text-decoration: underline; color: blue;' },
        'details...'
      );

      detailsLink.addEventListener('click', (event) => {
        event.preventDefault();
        this.showBookDetails([book]);
      });

      li.append(titleSpan, detailsLink);
      list.append(li);
    });

    this.result.appendChild(list);

    // Add pagination navigation
    const pagination = this.createPagination(envelope.links);
    this.result.appendChild(pagination);
  }

  /**
 * Creates pagination controls for navigating results.
 */
private createPagination(links: NavLinks): HTMLElement {
  const paginationContainer = makeElement('div', {
    class: 'pagination',
    style: 'display: flex; justify-content: space-between; align-items: center; width: 100%;',
  });

  // Previous Button
  const prevButton = makeElement(
    'button',
    {
      style: 'color: blue; text-decoration: underline; cursor: pointer;', // Updated styles
    },
    '<< Previous'
  );

  if (links.prev) {
    prevButton.addEventListener('click', async () => {
      const prevUrl = new URL(links.prev.href, this.wsUrl).toString(); // Convert to absolute URL
      console.log('Fetching previous page:', prevUrl); // Debug log
      try {
        const result = await this.ws.findBooksByUrl(prevUrl);
        if (result.isOk) {
          this.displayBooksWithPagination(result.val);
        } else {
          const errorResult = result as Errors.ErrResult;
          console.error('Error fetching previous page:', errorResult);
          this.displayErrors(errorResult.errors);
        }
      } catch (
        error) {
          console.error('Unexpected error fetching previous page:', error);
        }
      });
    paginationContainer.appendChild(prevButton);
  } else {
    // Disable the button if no previous link
    prevButton.setAttribute('disabled', 'true');
    prevButton.style.cursor = 'not-allowed'; // Add visual indication
    paginationContainer.appendChild(prevButton);
  }

  // Next Button
  const nextButton = makeElement(
    'button',
    {
      style: 'color: blue; text-decoration: underline; cursor: pointer;', // Updated styles
    },
    'Next >>'
  );

  if (links.next) {
    nextButton.addEventListener('click', async () => {
      const nextUrl = new URL(links.next.href, this.wsUrl).toString(); // Convert to absolute URL
      console.log('Fetching next page:', nextUrl); // Debug log
      try {
        const result = await this.ws.findBooksByUrl(nextUrl);
        if (result.isOk) {
          this.displayBooksWithPagination(result.val);
        } else {
          const errorResult = result as Errors.ErrResult;
          console.error('Error fetching next page:', errorResult);
          this.displayErrors(errorResult.errors);
        }
      } catch (error) {
        console.error('Unexpected error fetching next page:', error);
      }
    });
    paginationContainer.appendChild(nextButton);
  } else {
    // Disable the button if no next link
    nextButton.setAttribute('disabled', 'true');
    nextButton.style.cursor = 'not-allowed'; // Add visual indication
    paginationContainer.appendChild(nextButton);
  }

  return paginationContainer;
}

  /**
   * Displays the details of one or more books.
   * Accepts a list of books, even if it's a single one.
   */
  private async showBookDetails(books: LinkedResult<Lib.XBook>[]) {
    // Clear existing book details but preserve the layout
    const detailsContainer = document.querySelector('.book-details');
    if (detailsContainer) {
      detailsContainer.remove(); // Remove previous details section
    }

    // Iterate over the list of books and fetch details for each
    for (const book of books) {
      const bookUrl = new URL(book.links.self.href, this.wsUrl).toString();
      console.log('Fetching details for book:', bookUrl); // Debug log

      try {
        const result = await this.ws.getBookByUrl(bookUrl);

        if (result.isOk) {
          const bookDetails = result.val;
          this.displayBookDetails(bookDetails.result); // Safely access the result
        } else {
          // Handle errors for individual book fetches
          const errorResult = result as Errors.ErrResult;
          console.error('Error fetching book details:', errorResult);
          this.displayErrors(errorResult.errors);
        }
      } catch (error) {
        console.error('Unexpected error fetching book details:', error);
      }
    }
  }

    /**
   * Renders the details of a book.
   */
  private async displayBookDetails(book: Lib.XBook) {
    const detailsContainer = document.querySelector('.book-details');
    if (detailsContainer) {
      detailsContainer.remove();
    }

    const details = makeElement('div', { class: 'book-details' });
    details.append(
      makeElement('p', {}, `ISBN: ${book.isbn}`),
      makeElement('p', {}, `Title: ${book.title}`),
      makeElement('p', {}, `Authors: ${book.authors?.join(', ') || 'N/A'}`),
      makeElement('p', {}, `Number of Pages: ${book.pages || 'N/A'}`),
      makeElement('p', {}, `Publisher: ${book.publisher || 'N/A'}`),
      makeElement('p', {}, `Number of Copies: ${book.nCopies || 'N/A'}`),
      makeElement('p', {}, 'Borrowers:')
    );
  
    const borrowersList = makeElement('ul');
    details.appendChild(borrowersList);

    try {
      // Fetch borrower list from backend
      const lendingsResult = await this.ws.getLends(book.isbn!);
      console.log('Fetched borrower list:', lendingsResult); // Debug log
    
      if (lendingsResult.isOk) {
        const lendings = lendingsResult.val.result; // Access the `result` field which contains the array
    
        // Ensure lendings is an array
        if (Array.isArray(lendings)) {
          lendings.forEach((lending) => {
            const borrowerItem = makeElement('li', {}, lending.patronId);
    
            const returnButton = makeElement(
              'button',
              { style: 'margin-left: 10px; color: blue; cursor: pointer;' },
              'Return Book'
            );
    
            returnButton.addEventListener('click', async () => {
              try {
                await this.ws.returnBook({ isbn: book.isbn, patronId: lending.patronId });
                alert(`Book returned by ${lending.patronId}`);
                borrowerItem.remove();
                if (book.nCopies !== undefined) {
                  book.nCopies += 1;
                  const copiesElement = document.querySelector('.book-details p:nth-child(6)');
                  if (copiesElement) {
                    copiesElement.textContent = `Number of Copies: ${book.nCopies}`;
                  }
                }
              } catch (error) {
                console.error('Error returning book:', error);
              }
            });
    
            borrowerItem.appendChild(returnButton);
            borrowersList.appendChild(borrowerItem);
          });
        } else {
          console.error('Lendings is not an array:', lendings);
          borrowersList.appendChild(makeElement('li', {}, 'No borrowers found.'));
        }
      } else {
        console.error('Error fetching borrower list:', lendingsResult);
        borrowersList.appendChild(makeElement('li', {}, 'Failed to fetch borrowers.'));
      }
    } catch (error) {
      console.error('Unexpected error fetching borrower list:', error);
      borrowersList.appendChild(makeElement('li', {}, 'Failed to fetch borrowers.'));
    }    
  
    // Checkout section
    const patronInput = makeElement('input', {
      id: 'patron-id',
      placeholder: 'Enter Patron ID',
    }) as HTMLInputElement;
  
    const checkoutButton = makeElement('button', {}, 'Checkout Book');
    checkoutButton.addEventListener('click', async () => {
      const patronId = patronInput.value.trim();
      if (!patronId) {
        alert('Please enter a Patron ID.');
        return;
      }
  
      try {
        const result = await this.ws.checkoutBook({ isbn: book.isbn, patronId });
        if (result.isOk) {
          alert(`Book checked out to Patron ID: ${patronId}`);
          if (book.nCopies && book.nCopies > 0) {
            book.nCopies -= 1;
            const copiesElement = document.querySelector('.book-details p:nth-child(6)');
            if (copiesElement) {
              copiesElement.textContent = `Number of Copies: ${book.nCopies}`;
            }
          }
  
          const borrowerItem = makeElement('li', {}, patronId);
  
          const returnButton = makeElement(
            'button',
            { style: 'margin-left: 10px; color: blue; cursor: pointer;' },
            'Return Book'
          );
  
          returnButton.addEventListener('click', async () => {
            try {
              await this.ws.returnBook({ isbn: book.isbn, patronId });
              alert(`Book returned by ${patronId}`);
              borrowerItem.remove();
              if (book.nCopies !== undefined) {
                book.nCopies += 1;
                const copiesElement = document.querySelector('.book-details p:nth-child(6)');
                if (copiesElement) {
                  copiesElement.textContent = `Number of Copies: ${book.nCopies}`;
                }
              }
            } catch (error) {
              console.error('Error returning book:', error);
            }
          });
  
          borrowerItem.appendChild(returnButton);
          borrowersList.appendChild(borrowerItem);
        } else {
          const errorResult = result as Errors.ErrResult;
          alert(`Failed to checkout book: ${errorResult.errors.map(err => err.message).join(', ')}`);
        }
      } catch (error) {
        console.error('Error checking out book:', error);
      }
    });
  
    details.append(
      makeElement('p', {}, 'Patron ID:'),
      patronInput,
      checkoutButton
    );
  
    const backButton = makeElement(
      'button',
      { style: 'margin-top: 20px; color: blue; cursor: pointer;' },
      'Back to Results'
    );
  
    backButton.addEventListener('click', () => {
      const detailsSection = document.querySelector('.book-details');
      if (detailsSection) {
        detailsSection.remove();
      }
      this.result.scrollIntoView();
    });
  
    details.appendChild(backButton);
  
    this.result.appendChild(details);
  }
  
  /**
   * Displays a specific error for a field.
   */
  private displayError(fieldId: string, message: string) {
    const fieldError = document.querySelector(`#${fieldId}-error`);
    if (fieldError) {
      fieldError.textContent = message;
    } else {
      this.errors.appendChild(makeElement('li', { class: 'error' }, message));
    }
  }

  /**
   * Clears all error messages.
   */
  private clearErrors() {
    this.errors.innerHTML = '';
    document.querySelectorAll('.error').forEach((el) => (el.textContent = ''));
  }

  /**
   * Displays errors in the error container.
   */
  private displayErrors(errors: Errors.Err[]) {
    errors.forEach((err) => {
      const id = err.options?.widget ?? err.options?.path;
      if (id) {
        this.displayError(id, err.message);
      } else {
        const li = makeElement('li', { class: 'error' }, err.message);
        this.errors.appendChild(li);
      }
    });
  }
}