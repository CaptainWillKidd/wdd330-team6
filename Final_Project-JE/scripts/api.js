// scripts/api.js

const BASE_URL = 'https://api.jikan.moe/v4';

/**
 * Fetches top anime to display on the home page
 * @returns {Promise<Array>} Array of top anime objects
 */
export async function getTopAnime() {
  try {
    const res = await fetch(`${BASE_URL}/top/anime?limit=12`);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch top anime:', error);
    return [];
  }
}
