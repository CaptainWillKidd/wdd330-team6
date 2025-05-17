import ProductData from './ProductData.mjs';
const dataSource = new ProductData('tents');
import ProductList from './ProductList.mjs';

const productListElement = document.querySelector('.product-list'); // or your specific selector
const tentList = new ProductList('tents', dataSource, productListElement);
tentList.init();
