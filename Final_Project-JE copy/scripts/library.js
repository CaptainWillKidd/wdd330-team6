import { getLibrary, removeFromLibrary } from './storage.js';
import { createAnimeCard } from './utils.js';

const libraryList = document.getElementById('libraryList');

function renderLibrary() {
  const library = getLibrary();
  libraryList.innerHTML = '';

  if (library.length === 0) {
    libraryList.innerHTML = '<p>Your library is empty.</p>';
    return;
  }

  library.forEach(anime => {
    const card = createAnimeCard(anime, false, true); // true = isLibrary
    libraryList.appendChild(card);
  });
}

renderLibrary();
