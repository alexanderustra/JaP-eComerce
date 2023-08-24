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

fetch(url) // conseguimos los datos desde la API.
    .then(response => response.json())
    .then(data => {
        const productsList = document.getElementById('container');
        data.products.forEach(product => {
            const li = document.createElement('li');
            li.className = 'product-list'
            li.innerHTML =  // creamos una lista que tiene dentro los datos conseguidos desde la API
               `<img src="${product.image}" alt="${product.name}">
                <div class = 'info-container'> 
                    <div class = 'name-and-price'>
                        <h2 class = 'product-name'>${product.name}</h2>
                        <h2>${product.cost} ${product.currency}</h2>
                    </div>

                    <p>${product.description}</p>
                    <p>Sold: ${product.soldCount}</p>
                    <button class = 'cart'>
                        <span class="material-symbols-outlined">
                        add_shopping_cart
                        </span>
                    </button>
                </div>
                `
            ;
            productsList.appendChild(li); // se muestra la lista en el DOM.
        });
    })
    .catch(error => console.error('Error fetching data:', error));

    document.getElementById('search-input').addEventListener('keyup',()=>{
        let inputValue = document.getElementById('search-input').value;
        let productNames = document.querySelectorAll('.product-name');
        productNames.forEach(product => {
            if(product.textContent.toLowerCase().includes(inputValue.toLowerCase())) {
                product.closest('.product-list').classList.remove('hidden')
            }
            else  {
                product.closest('.product-list').classList.add('hidden')
            }
        })
    })
});