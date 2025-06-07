document.addEventListener('DOMContentLoaded', () => {
  const libraryContainer = document.getElementById('libraryContainer');
  const saved = JSON.parse(localStorage.getItem('watchList')) || [];

  if (saved.length === 0) {
    libraryContainer.innerHTML = "<p>No items in your library.</p>";
  } else {
    libraryContainer.innerHTML = saved.map(item => `
      <div class="card">
        <h3>${item.title}</h3>
        <p>${item.type} | ${item.status}</p>
      </div>
    `).join('');
  }
});
