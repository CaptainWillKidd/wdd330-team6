// scripts/api.js

const API_BASE = 'https://api.jikan.moe/v4';

/**
 * Fetch top anime from Jikan API
 * @returns {Promise<Array>} Array of top anime objects
 */
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

/**
 * Search anime by title using Jikan API
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of anime results
 */
export async function searchAnime(query) {
  try {
    const res = await fetch(`${API_BASE}/anime?q=${encodeURIComponent(query)}&limit=20`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error searching anime:', error);
    return [];
  }
}
