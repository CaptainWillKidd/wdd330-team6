export function addToLibrary(anime) {
  const library = JSON.parse(localStorage.getItem('animeLibrary')) || [];

  const exists = library.some(item => item.id === anime.id);
  if (!exists) {
    library.push(anime);
    localStorage.setItem('animeLibrary', JSON.stringify(library));
  }
}

function displayLibrary() {
  const container = document.getElementById('libraryList');
  if (!container) return;

  const library = JSON.parse(localStorage.getItem('animeLibrary')) || [];

  container.innerHTML = '';

  if (library.length === 0) {
    container.innerHTML = '<p>No anime in your library yet.</p>';
    return;
  }

  library.forEach(anime => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${anime.image}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>Score: ${anime.score || 'N/A'}</p>
    `;

    container.appendChild(card);
  });
}

// Only run display if we're on the library page
if (window.location.pathname.includes('library.html')) {
  displayLibrary();
}
