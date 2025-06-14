// scripts/api.js

const BASE_URL = 'https://api.jikan.moe/v4';

/**
 * Fetches top anime to display on the home page
 * @returns {Promise<Array>} Array of top anime objects
 */
export async function getTopAnime() {
  try {
    const res = await fetch(`${BASE_URL}/top/anime?limit=12`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch top anime:', error);
    return [];
  }
}

/**
 * Searches for anime based on a user query
 * @param {string} query - The search term
 * @returns {Promise<Array>} Array of anime results
 */
export async function searchAnime(query) {
  try {
    const res = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=12`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Failed to search anime:', error);
    return [];
  }
}

/**
 * Fetch detailed anime info by MAL ID (for detail.html page)
 * @param {number} id - The MyAnimeList ID of the anime
 * @returns {Promise<Object|null>} Anime detail object or null on failure
 */
export async function getAnimeDetails(id) {
  try {
    const res = await fetch(`${BASE_URL}/anime/${id}/full`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Failed to get details for anime ID ${id}:`, error);
    return null;
  }
}
