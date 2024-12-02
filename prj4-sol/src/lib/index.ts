import makeApp from './app.js';

const DEFAULT_WS_URL = 'https://localhost:2345';

/**
 * Entry point for the application.
 * Initializes the app after the DOM content is fully loaded.
 */
window.addEventListener('DOMContentLoaded', () => {
  try {
    const wsUrl = getWsUrl();
    console.log(`Using Web Services URL: ${wsUrl}`);
    makeApp(wsUrl);
  } catch (error) {
    console.error('Error during app initialization:', error);
    const errorContainer = document.getElementById('errors');
    if (errorContainer) {
      errorContainer.innerHTML = `<p>Failed to initialize the application. Please try again later.</p>`;
    }
  }
});

/**
 * Extracts the Web Services URL from the query parameters.
 * Defaults to `DEFAULT_WS_URL` if no parameter is found.
 * @returns The Web Services URL to be used by the application.
 */
function getWsUrl(): string {
  try {
    const url = new URL(document.location.href);
    return url.searchParams.get('ws-url') ?? DEFAULT_WS_URL;
  } catch (error) {
    console.error('Invalid URL detected, using default Web Services URL:', error);
    return DEFAULT_WS_URL;
  }
}
