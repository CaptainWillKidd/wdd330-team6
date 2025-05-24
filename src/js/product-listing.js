import ProductData from 'productdata.mjs';
import { renderListWithTemplate, getParam } from './utils.mjs';
import { productCardTemplate } from 'productlist.mjs';

const category = getParam("category");
const dataSource = new ProductData(category);
const element = document.querySelector(".product-list");

dataSource.getData().then((list) => {
  renderListWithTemplate(productCardTemplate, element, list);
});
