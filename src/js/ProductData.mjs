export default class ProductData {
  async getData(category) {
    const response = await fetch(`/json/${category}.json`);
    const data = await response.json();
    return data.Result;
  }
  async findProductById(id) {
    const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
    for (const category of categories) {
      const response = await fetch(`/json/${category}.json`);
      const data = await response.json();
      const found = data.find(product => product.Id === id);
      if (found) return found;
    }
    return null;
  }
}
