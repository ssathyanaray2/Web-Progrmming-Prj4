import { Errors } from 'cs544-js-utils';
import makeApp from './app.js';

const DEFAULT_WS_URL = 'https://localhost:2345';

/**
 * Entry point for the application.
 * Initializes the app after the DOM content is fully loaded.
 */
window.addEventListener('DOMContentLoaded', async () => {
  const wsUrl = getWsUrl();
  console.log(`Using Web Services URL: ${wsUrl}`);
  makeApp(wsUrl);
});

/**
 * Extracts the Web Services URL from the query parameters.
 * Defaults to `DEFAULT_WS_URL` if no parameter is found.
 * @returns The Web Services URL to be used by the application.
 */
function getWsUrl(): string {
  const url = new URL(document.location.href);
  return url.searchParams.get('ws-url') ?? DEFAULT_WS_URL;
}
