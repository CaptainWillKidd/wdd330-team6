import { addToLibrary, removeFromLibrary, isInLibrary } from './storage.js';

/**
 * Create a card element for an anime entry.
 * @param {Object} anime - Anime object from API.
 * @param {boolean} showAddButton - Show add button (e.g., in search/home).
 * @param {boolean} isLibrary - If rendering in the user's library.
 * @returns {HTMLElement} Card element.
 */
export function createAnimeCard(anime, showAddButton = false, isLibrary = false) {
  const card = document.createElement('div');
  card.className = 'anime-card';

  const img = document.createElement('img');
  img.src = anime.images?.jpg?.image_url || anime.image_url || '';
  img.alt = anime.title;

  const title = document.createElement('h3');
  title.textContent = anime.title;

  const status = document.createElement('p');
  status.textContent = `Status: ${anime.status || 'Unknown'}`;

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(status);

  if (showAddButton) {
    const addBtn = document.createElement('button');
    addBtn.textContent = isInLibrary(anime.mal_id) ? 'In Library' : 'Add to Library';
    addBtn.disabled = isInLibrary(anime.mal_id);
    addBtn.addEventListener('click', () => {
      addToLibrary(anime);
      addBtn.textContent = 'In Library';
      addBtn.disabled = true;
    });
    card.appendChild(addBtn);
  }

  if (isLibrary) {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove from Library';
    removeBtn.addEventListener('click', () => {
      removeFromLibrary(anime.mal_id);
      card.remove();
    });
    card.appendChild(removeBtn);
  }

  return card;
}
