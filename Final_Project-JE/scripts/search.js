document.getElementById('searchButton').addEventListener('click', async () => {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) return;

  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=10`);
  const data = await response.json();

  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (data.data && data.data.length) {
    data.data.forEach(anime => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
        <h3>${anime.title}</h3>
        <p>${anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : 'No description available.'}</p>
        <button data-anime='${JSON.stringify(anime)}'>Add to Library</button>
      `;

      card.querySelector('button').addEventListener('click', () => {
        const stored = JSON.parse(localStorage.getItem('library')) || [];
        const exists = stored.find(item => item.mal_id === anime.mal_id);
        if (!exists) {
          stored.push({
            mal_id: anime.mal_id,
            title: anime.title,
            image_url: anime.images.jpg.image_url,
            synopsis: anime.synopsis
          });
          localStorage.setItem('library', JSON.stringify(stored));
          alert(`${anime.title} added to library.`);
        } else {
          alert(`${anime.title} is already in your library.`);
        }
      });

      resultsContainer.appendChild(card);
    });
  } else {
    resultsContainer.innerHTML = '<p>No results found.</p>';
  }
});
