document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('library');
  const stored = JSON.parse(localStorage.getItem('library')) || [];

  if (stored.length === 0) {
    container.innerHTML = '<p>Your library is empty. Add some anime from the search page!</p>';
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

    container.appendChild(card);
  });
});
