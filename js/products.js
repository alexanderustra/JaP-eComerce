/* 
Realizar una petición web a una URL donde se encuentra una colección de productos en formato JSON (pertenecientes a una categoría), con la información (precio, nombre, descripción, cantidad vendidos e imagen) respectiva a cada producto, y mostrar el listado en products.html.
En principio haremos uso únicamente de la categoría 101 (Autos), pero en entregas posteriores nos encargaremos de mostrarle al usuario los productos de la categoría seleccionada.
*/
document.addEventListener('DOMContentLoaded', () => {
    const logueado = localStorage.getItem('logueado');
    if (logueado === 'false') {
        window.location.href = '../login.html';
    }
    document.getElementById('perfil-a').textContent = localStorage.getItem('nombreUsuario');
    
    let endPoint = localStorage.getItem('catID');
const url = `https://japceibal.github.io/emercado-api/cats_products/${endPoint}.json`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const productsList = document.getElementById('container');
    const productNames = [];
    const productDescriptions = [];

    data.products.forEach(product => {
      const li = document.createElement('li');
      li.className = 'product-list';
      li.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="info-container">
          <div class="name-and-price">
            <h2 class="product-info">${product.name}</h2>
            <h2 class="product-cost">${product.cost} ${product.currency}</h2>
          </div>
          <p class="product-info">${product.description}</p>
          <p>Sold: ${product.soldCount}</p>
          <button class="cart">
            <span class="material-symbols-outlined">
              add_shopping_cart
            </span>
          </button>
        </div>
      `;
      productsList.appendChild(li);

      productNames.push(product.name.toLowerCase());
      productDescriptions.push(product.description.toLowerCase());
    });

    document.getElementById('search-input').addEventListener('keyup', () => {
      const inputValue = document.getElementById('search-input').value.toLowerCase();
      const productList = document.querySelectorAll('.product-list');

      for (let i = 0; i < productList.length; i++) {
        const product = productList[i];
        const productName = productNames[i];
        const productDescription = productDescriptions[i];

        if (productName.includes(inputValue) || productDescription.includes(inputValue)) {
          product.classList.remove('hidden');
        } else {
          product.classList.add('hidden');
        }
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));

    document.getElementById("filter-btn").addEventListener("click", function(){
        let productPrices = document.querySelectorAll('.product-cost');
        let minPrice = document.getElementById("rangeFilterPriceMin").value;
        let maxPrice = document.getElementById("rangeFilterPriceMax").value;
    
        productPrices.forEach(product => {
            let productCost = parseFloat(product.textContent);
            let productItem = product.closest('.product-list');

            if(minPrice === '' || minPrice === undefined) {
                minPrice = 0;
            }
            if(maxPrice === '' || maxPrice === undefined) {
                maxPrice = Infinity;
            }
    
            if (productCost >= minPrice && productCost <= maxPrice) {
                productItem.classList.remove('hidden');
            } else {
                productItem.classList.add('hidden');
            }
        });
    });
    
});