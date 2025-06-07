export async function fetchData() {
  try {
    const res = await fetch('https://api.sampleapis.com/coffee/hot'); // replace with your actual API
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('API fetch error:', err);
    return [];
  }
}
