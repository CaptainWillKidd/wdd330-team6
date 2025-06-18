const LIBRARY_KEY = 'animeLibrary';

/**
 * Get the user's anime library from localStorage.
 * @returns {Array} List of anime objects.
 */
export function getLibrary() {
  const json = localStorage.getItem(LIBRARY_KEY);
  return json ? JSON.parse(json) : [];
}

/**
 * Add an anime to the user's library.
 * @param {Object} anime - Anime object to store.
 */
export function addToLibrary(anime) {
  const library = getLibrary();
  if (!library.some(item => item.mal_id === anime.mal_id)) {
    library.push(anime);
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
  }
}

/**
 * Remove an anime from the user's library.
 * @param {number} mal_id - Unique ID of the anime to remove.
 */
export function removeFromLibrary(mal_id) {
  const library = getLibrary().filter(item => item.mal_id !== mal_id);
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
}

/**
 * Check if an anime is already in the library.
 * @param {number} mal_id - Unique ID of the anime.
 * @returns {boolean} True if already stored.
 */
export function isInLibrary(mal_id) {
  return getLibrary().some(item => item.mal_id === mal_id);
}
