document.addEventListener('DOMContentLoaded', () => {
    const logueado = localStorage.getItem('logueado');
    if (logueado === 'false') {
        window.location.href = '../login.html';
    }
    document.getElementById('perfil-a').textContent = localStorage.getItem('nombreUsuario');
  // catID se guarda al dar click en una categoría.
  let endPoint = localStorage.getItem('catID');
  const url = `https://japceibal.github.io/emercado-api/cats_products/${endPoint}.json`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const productsList = document.getElementById('container');
    const productNames = [];
    const productDescriptions = [];
    //si no hay datos se crea un modal indicando que no hay stock;
    if(data.products.length == 0) {
      let noStockH1 = document.createElement('h1');
      noStockH1.textContent = 'No hay stock brodeell';
      noStockH1.className = 'no-stock-h1'
      productsList.appendChild(noStockH1);
    }
    /*en caso de que se encuentren datos, se crea una lista y
    se coloca dentro los datos, luego esa lista se muestra en el 
    DOM.
    */
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
          

          <div id = 'sold-and-btn-container'> 
          <p>Sold: ${product.soldCount}</p>
          <button class="cart">
            <span class="material-symbols-outlined">
              add_shopping_cart
            </span>
          </button>
          </div>
        </div>
      `;
      productsList.appendChild(li);

      productNames.push(product.name.toLowerCase());
      productDescriptions.push(product.description.toLowerCase());
    });

    /* Con cada cambio en el buscador se verifica si el valor concuerda
      con los valores del nombre o descripción de cada lista, las listas cuyo 
      valores no concuerdan se las oculta mediante un cambio de clase.
    */
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
            /*si un campo se mantiene vacío se le asigna un valor predeterminado,
            ya sea 0, para el minimo o infinito para el maximo*/ 
            if(minPrice === '' || minPrice === undefined) {
                minPrice = 0;
            }
            if(maxPrice === '' || maxPrice === undefined) {
                maxPrice = Infinity;
            }
            /*si el precio del producto está entre los valores de los inputs se
            mantiene la lista en pantalla*/
            if (productCost >= minPrice && productCost <= maxPrice) {
                productItem.classList.remove('hidden');
            } else {
                productItem.classList.add('hidden');
            }
        });
    });
    
});