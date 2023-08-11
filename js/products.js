/* 
Realizar una petición web a una URL donde se encuentra una colección de productos en formato JSON (pertenecientes a una categoría), con la información (precio, nombre, descripción, cantidad vendidos e imagen) respectiva a cada producto, y mostrar el listado en products.html.
En principio haremos uso únicamente de la categoría 101 (Autos), pero en entregas posteriores nos encargaremos de mostrarle al usuario los productos de la categoría seleccionada.
*/
document.addEventListener('DOMContentLoaded', () => {
    const logueado = localStorage.getItem('logueado');
    if (logueado === 'false') {
        window.location.href = '../login.html';
    }

const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

fetch(url)
    .then(response => response.json())
    .then(data => {
        const productsList = document.getElementById('container');
        data.products.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = 
               `<h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Price: ${product.cost} ${product.currency}</p>
                <p>Sold: ${product.soldCount}</p>
                <img src="${product.image}" alt="${product.name}"> `
            ;
            productsList.appendChild(li);
            console.log(data)
        });
    })
    .catch(error => console.error('Error fetching data:', error));

});