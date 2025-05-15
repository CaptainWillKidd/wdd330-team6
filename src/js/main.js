import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData('tents.json');
const tentsListEl = document.getElementById('tentsList');

const tentsList = new ProductList('tents', dataSource, tentsListEl);
tentsList.init();
