export function saveToLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromLocal(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
