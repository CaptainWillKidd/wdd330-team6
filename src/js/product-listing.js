import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

import { updateBreadcrumb } from './utils.mjs';
document.addEventListener("DOMContentLoaded", () => {
    updateBreadcrumb();
});

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();

const title = document.querySelector("#category-title");

const sortFilter = document.querySelector("#sortFilter");

title.textContent = category.charAt(0).toUpperCase() + category.slice(1);


const listElement = document.querySelector('.product-list'); // or your specific selector
const myList = new ProductList(category, dataSource, listElement);
myList.init();

sortFilter.addEventListener("change", () => {
    myList.init(sortFilter.value);
});
