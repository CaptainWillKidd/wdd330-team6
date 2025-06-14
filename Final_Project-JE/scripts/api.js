document.addEventListener('DOMContentLoaded', () => {
  const topAnimeSection = document.getElementById('topAnime');
  if (topAnimeSection) {
    loadTopAnime();
  }

  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }

  const librarySection = document.getElementById('library');
  if (librarySection) {
    loadLibrary();
  }
});

// Load Top Anime from Jikan API
async function loadTopAnime() {
  const container = document.getElementById('topAnime');
  if (!container) return;

  try {
    const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=6');
    const data = await response.json();

    container.innerHTML = '';

    data.data.forEach(anime => {
      const card = document.createElement('div');
      card.classList.add('card');

      const img = document.createElement('img');
      img.src = anime.images.jpg.image_url;
      img.alt = anime.title;

      const title = document.createElement('h3');
      title.textContent = anime.title;

      const desc = document.createElement('p');
      desc.textContent = anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : 'No description available.';

      const button = document.createElement('button');
      button.textContent = 'Add to Library';
      button.addEventListener('click', () => addToLibrary(anime));

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(button);

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to load top anime:', error);
    container.innerHTML = '<p>Failed to load top anime. Please try again later.</p>';
  }
}

// Add anime to localStorage library
function addToLibrary(anime) {
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
    alert(`${anime.title} added to your library.`);
  } else {
    alert(`${anime.title} is already in your library.`);
  }
}

// Load Library from localStorage
function loadLibrary() {
  const librarySection = document.getElementById('library');
  const stored = JSON.parse(localStorage.getItem('library')) || [];

  librarySection.innerHTML = '';

  if (stored.length === 0) {
    librarySection.innerHTML = '<p>No items in your library yet.</p>';
    return;
  }

  stored.forEach(anime => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${anime.image_url}" alt="${anime.title}" />
      <h3>${anime.title}</h3>
      <p>${anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : 'No description available.'}</p>
    `;

    librarySection.appendChild(card);
  });
}

// Handle Search Form
async function handleSearch(e) {
  e.preventDefault();
  const query = document.getElementById('searchQuery').value.trim();
  const container = document.getElementById('searchResults');
  if (!query || !container) return;

  container.innerHTML = '<p>Loading...</p>';

  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=10`);
    const data = await response.json();

    container.innerHTML = '';

    data.data.forEach(anime => {
      const card = document.createElement('div');
      card.classList.add('card');

      const img = document.createElement('img');
      img.src = anime.images.jpg.image_url;
      img.alt = anime.title;

      const title = document.createElement('h3');
      title.textContent = anime.title;

      const desc = document.createElement('p');
      desc.textContent = anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : 'No description available.';

      const button = document.createElement('button');
      button.textContent = 'Add to Library';
      button.addEventListener('click', () => addToLibrary(anime));

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(button);

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Search failed:', error);
    container.innerHTML = '<p>Search failed. Please try again later.</p>';
  }
}
