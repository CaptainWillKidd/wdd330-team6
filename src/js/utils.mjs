// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage with error handling
export function getLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return null;
  }
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function updateBreadcrumb() {
  const breadcrumb = document.querySelector("#breadcrumbs");
  if (!breadcrumb) return;

  const path = window.location.pathname; 
  const segments = path.split('/').filter(Boolean);
  
  
  breadcrumb.innerHTML = '';

  if (segments[0] == "product_listing") {
    let category = getParam("category");

    category = category.charAt(0).toUpperCase() + category.slice(1)

    const home = document.createElement('span');
    home.textContent = ' Home > ';
    breadcrumb.appendChild(home);

    const products = document.createElement("span");
    products.textContent = " " + category + " > " + document.querySelectorAll(".product-card").length + " Items";
    breadcrumb.appendChild(products); 

  } else if (segments[0] == "product_pages") {

    const home = document.createElement('span');
    home.textContent = ' Home > ';
    breadcrumb.appendChild(home);

    const products = document.createElement("span");
    products.textContent = "Product Category";
    breadcrumb.appendChild(products); 
  } else if (segments[0] == "cart") {
    const home = document.createElement('span');
    home.textContent = ' Home > ';
    breadcrumb.appendChild(home);

    const products = document.createElement("span");
    products.textContent = "Cart";
    breadcrumb.appendChild(products); 
  } else if (segments[0] == "checkout") {
    const home = document.createElement('span');
    home.textContent = ' Home > ';
    breadcrumb.appendChild(home);

    const products = document.createElement("span");
    products.textContent = "Checkout";
    breadcrumb.appendChild(products); 
  }

}


export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = true) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;

  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path){
  const res = await fetch(path);
  const template = await res.text();
  return template; 
}

export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("../partials/header.html");

  const headerElement = document.querySelector("#main-header");

  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("../partials/footer.html");

  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(footerTemplate, footerElement);
}

export async function getAlertMessage(type) {
  const response = await fetch('/json/alerts.json');
  const alerts = await response.json();
  const alert = alerts.find(a => a.type === type);
  return alert || { message: "Unknown alert", background: "red", color: "white" };
}
