export function createCard(item) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h2>${item.title || item.name}</h2>
    <img src="${item.image || 'assets/placeholder.png'}" alt="${item.title}" style="width:100%; border-radius:8px;" />
    <p>${item.description || 'No description available.'}</p>
    <button onclick="alert('Saved!')">Save</button>
  `;
  return card;
}
