// scripts/app.js
import { getTopAnime } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const animeList = document.getElementById('anime-list');
  const topAnime = await getTopAnime();

  animeList.innerHTML = '';

  topAnime.forEach((anime) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${anime.images.webp.image_url}" alt="${anime.title}" />
      <div class="card-content">
        <h3>${anime.title}</h3>
        <p>Score: ${anime.score ?? 'N/A'}</p>
        <button data-id="${anime.mal_id}">Add to Library</button>
      </div>
    `;

    const button = card.querySelector('button');
    button.addEventListener('click', () => addToLibrary(anime));

    animeList.appendChild(card);
  });
});

function addToLibrary(anime) {
  let library = JSON.parse(localStorage.getItem('library')) || [];
  const exists = library.find((a) => a.mal_id === anime.mal_id);
  if (!exists) {
    library.push({
      mal_id: anime.mal_id,
      title: anime.title,
      image: anime.images.webp.image_url,
      score: anime.score,
    });
    localStorage.setItem('library', JSON.stringify(library));
    alert(`"${anime.title}" added to your library!`);
  } else {
    alert(`"${anime.title}" is already in your library.`);
  }
}
