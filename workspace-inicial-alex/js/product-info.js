document.addEventListener('DOMContentLoaded', () => {
    const logueado = localStorage.getItem('logueado');
    if (logueado === 'false' || logueado === null) {
        window.location.href = '../login.html';
    }
    document.getElementById('perfil-a').textContent = localStorage.getItem('nombreUsuario');

    //consiguiendo info del producto
    let productId = localStorage.getItem('productID');
    let urlPoducto = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
    fetch(urlPoducto)
    .then(response => response.json())
    .then(data => { 
        let container = document.createElement('DIV');
        /* se crea un arreglo donde, por cada url que mande la API, se crea un elemento
            HTML img con esa url.
        */
        let imagesHtml = data.images.map(image => `<img src="${image}">`).join('');
        // lo mismo con los productos relacionados.
        let relatedProductsHtml = data.relatedProducts.map(product => `
            <div class="related-product">
                <h3>${product.name}</h3>
                <img src="${product.image}">
            </div>
        `).join('');
        
         // finalmente se muestran el pantalla todos los datos.
        container.innerHTML = `
            <h1>${data.name}</h1>
            <div id="img-container">${imagesHtml}</div>
            <p>${data.cost} ${data.currency}</p>
            <p>Vendidos: ${data.soldCount}</p>
            <h2>Descripción del producto</h2>
            <p>${data.description}</p>
            <h2>Productos similares</h2>
            <div id="related-products-container">
                ${relatedProductsHtml}
            </div>
        `

        document.getElementById('container').appendChild(container);
    })
    .catch(error => console.error('Error fetching data:', error));

    //consiguiendo comentarios
    let urlComentarios = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`
    fetch(urlComentarios)
    .then(response => response.json())
    .then(data => { 
        // lo mismo, usar .map para generar una lista con el comentario.
        let commentsArray = data.map(comment => 
            `<li class = 'comment'>
                    <h4>${comment.user}</h4>
                    <h4>${comment.dateTime}</h4>
                    <p>${comment.description}</p>
                    <h4>Puntuación: ${comment.score}</h4>
                </li>`
        ).join('');
        document.getElementById('coment-container').innerHTML = commentsArray
    })
    .catch(error => console.error('Error fetching data:', error));

    //mostrando en pantalla el comentario del ususario.
    document.getElementById('enviar-btn').addEventListener('click',()=>{
        const input = document.getElementById('user-text').value;
        const select = document.getElementById('puntaje').value;
        let actualDate = new Date();
        let day = actualDate.getDate();
        let month = actualDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por eso se suma 1
        let year = actualDate.getFullYear();

        const coment = document.createElement('li');
        coment.className = 'comment'
        coment.innerHTML = `
            <h4>${localStorage.getItem('nombreUsuario')}</h4>
            <h4>${year}-${month}-${day}</h4>
            <p>${input}</p>
            <h4>Puntuación: ${select}</h4>
        `
        document.getElementById('coment-container').appendChild(coment)
    })
});