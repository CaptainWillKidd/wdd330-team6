import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="../product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Imagem de ${product.Name}">
        <h2 class="card__brand">${product.Brand.Id} - ${product.Brand.Name}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
      </a>
    </li>
  `;
}


export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource  = dataSource;
    this.listElement = listElement;
  }
  
  async init(sortValue) {
    const list = await this.dataSource.getData(this.category);

    switch (sortValue) {
      case "name-asc":
        list.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case "name-desc":
        list.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      case "price-asc":
        list.sort((a, b) => a.FinalPrice - b.FinalPrice);
        break;
      case "price-desc":
        list.sort((a, b) => b.FinalPrice - a.FinalPrice);
        break;
      default:
        list.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
    }

    this.renderList(list);
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));

    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
