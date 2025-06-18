import { searchAnime } from './api.js';
import { createAnimeCard } from './utils.js';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsSection = document.getElementById('searchResults');

searchButton.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  const results = await searchAnime(query);
  resultsSection.innerHTML = '';

  results.forEach(anime => {
    const card = createAnimeCard(anime, true); // true = show "Add to Library"
    resultsSection.appendChild(card);
  });
});
