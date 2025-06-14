import { searchAnime } from './api.js';

document.getElementById('searchBtn').addEventListener('click', async () => {
  const query = document.getElementById('searchInput').value.trim();
  const results = await searchAnime(query);

  const container = document.getElementById('searchResults');
  container.innerHTML = '';

  results.forEach(anime => {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <button onclick="addToLibrary(${anime.mal_id}, '${anime.title.replace(/'/g, "\\'")}')">Add</button>
    `;
    container.appendChild(card);
  });
});

window.addToLibrary = function(id, title) {
  let library = JSON.parse(localStorage.getItem('library')) || [];
  if (!library.find(item => item.id === id)) {
    library.push({ id, title });
    localStorage.setItem('library', JSON.stringify(library));
    alert(`${title} added to your library!`);
  }
};
