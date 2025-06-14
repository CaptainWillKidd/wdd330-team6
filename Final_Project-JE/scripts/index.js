// scripts/index.js

import { getTopAnime } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const animeListContainer = document.getElementById('anime-list');
  const animes = await getTopAnime();

  if (animes.length === 0) {
    animeListContainer.innerHTML = '<p>Failed to load top anime. Please try again later.</p>';
    return;
  }

  animeListContainer.innerHTML = animes.map(anime => `
    <div class="card">
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>Score: ${anime.score || 'N/A'}</p>
    </div>
  `).join('');
});
