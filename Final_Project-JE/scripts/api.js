// scripts/api.js

const API_BASE = 'https://api.jikan.moe/v4';

export async function getTopAnime() {
  try {
    const res = await fetch(`${API_BASE}/top/anime?limit=10`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching top anime:', error);
    return [];
  }
}
