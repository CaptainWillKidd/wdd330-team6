import { addToLibrary } from './library.js';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

searchButton.addEventListener('click', async () => {
  const query = searchInput.value.trim();
  if (query === '') return;

  searchResults.innerHTML = '<p>Searching...</p>';

  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=10`);
    const data = await res.json();

    searchResults.innerHTML = '';

    if (data.data && data.data.length > 0) {
      data.data.forEach(anime => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
          <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
          <h3>${anime.title}</h3>
          <p>Score: ${anime.score || 'N/A'}</p>
          <button class="add-btn">Add to Library</button>
        `;

        const addBtn = card.querySelector('.add-btn');
        addBtn.addEventListener('click', () => {
          addToLibrary({
            id: anime.mal_id,
            title: anime.title,
            image: anime.images.jpg.image_url,
            score: anime.score
          });
          addBtn.textContent = 'Added!';
          addBtn.disabled = true;
        });

        searchResults.appendChild(card);
      });
    } else {
      searchResults.innerHTML = '<p>No results found.</p>';
    }
  } catch (error) {
    console.error('Search error:', error);
    searchResults.innerHTML = '<p>Error fetching search results. Try again later.</p>';
  }
});
