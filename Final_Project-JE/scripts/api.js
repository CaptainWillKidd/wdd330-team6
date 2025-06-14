// scripts/api.js

const API_BASE = 'https://api.jikan.moe/v4';

// Fetch top anime
export async function fetchTopAnime(limit = 10) {
  try {
    const response = await fetch(`${API_BASE}/top/anime?limit=${limit}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching top anime:', error);
    return [];
  }
}

// Display anime on the homepage
export async function displayTopAnime(containerSelector) {
  const container = document.querySelector(containerSelector);
  const animeList = await fetchTopAnime();

  animeList.forEach(anime => {
    const card = document.createElement('div');
    card.classList.add('anime-card');

    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>Type: ${anime.type}</p>
      <p>Status: ${anime.status}</p>
    `;

    container.appendChild(card);
  });
}
