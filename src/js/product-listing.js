import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();

const title = document.querySelector("#category-title");

title.textContent = category.charAt(0).toUpperCase() + category.slice(1);


const listElement = document.querySelector('.product-list'); // or your specific selector
const myList = new ProductList(category, dataSource, listElement);
myList.init();