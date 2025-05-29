const baseURL = import.meta.env.VITE_SERVER_URL || "https://wdd330-backend.onrender.com/";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);    
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await response.json();
    return data.Result;
  }

  static async checkout(order) {
    const url = `${baseURL}checkout`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    };
    const response = await fetch(url, options);
    return response.json();
  }
}
