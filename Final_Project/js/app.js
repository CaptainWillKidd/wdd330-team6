import { fetchData } from './api.js';
import { createCard } from './components/cardComponent.js';

async function init() {
  const resultsContainer = document.getElementById('results');
  const searchInput = document.getElementById('searchInput');
  const data = await fetchData();

  function render(dataToRender) {
    resultsContainer.innerHTML = '';
    dataToRender.forEach(item => {
      resultsContainer.appendChild(createCard(item));
    });
  }

  render(data);

  searchInput.addEventListener('input', () => {
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    render(filtered);
  });
}

init();
