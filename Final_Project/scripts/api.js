// Replace with actual API call logic later
document.addEventListener('DOMContentLoaded', () => {
  const trending = document.getElementById('trending');
  const searchBtn = document.getElementById('searchBtn');

  if (trending) {
    trending.innerHTML = `<p>Loading trending titles...</p>`;
    // TODO: Fetch data from Jikan API
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const query = document.getElementById('searchBar').value;
      const results = document.getElementById('searchResults');
      results.innerHTML = `<p>Searching for "${query}"...</p>`;
      // TODO: Add search API logic
    });
  }
});
