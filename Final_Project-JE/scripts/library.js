document.addEventListener('DOMContentLoaded', () => {
  const library = JSON.parse(localStorage.getItem('library')) || [];
  const container = document.getElementById('libraryList');

  if (library.length === 0) {
    container.innerHTML = '<p>No anime added yet.</p>';
    return;
  }

  library.forEach(item => {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.innerHTML = `<h3>${item.title}</h3>`;
    container.appendChild(card);
  });
});
