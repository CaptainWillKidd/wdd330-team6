import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData('tents');
const productListElement = document.querySelector('.product-list'); // or your specific selector
const tentList = new ProductList('tents', dataSource, productListElement);
tentList.init();

