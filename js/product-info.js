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
        console.log(data)
        let container = document.createElement('DIV');
        /* se crea un arreglo donde, por cada url que mande la API, se crea un elemento
            HTML img con esa url.
        */
        let imagesHtml = data.images.map(image => `<img src="${image}">`).join('');

            let relatedProductsHtml = data.relatedProducts.map(product => `
                <div class="related-product" data-product-id="${product.id}">
                    <!-- Contenido de productos relacionados -->
                    <h3>${product.name}</h3>
                    <img src="${product.image}">
                </div>
            `).join('');

         // finalmente se muestran el pantalla todos los datos.
        container.innerHTML = `
            <h1>${data.name}</h1>
            <section id = 'img-and-seller-container'>
                <div id="img-container">
                    ${imagesHtml}
                </div>
                <div id = 'aside-container'> 
                    <div id="buy-info">
                    <p class="price-and-sold">${data.cost} ${data.currency}</p>
                    <p class="price-and-sold">Vendidos: ${data.soldCount}</p>
                    <input type = 'number' placeholder = 'Cantidad' min = '1'>
                    <button>Comprar</button>
                    <button>Añadir al carrito</button>

                    <div id = 'seller-info'>
                        <h4>Nombre Vendedor</H4>
                        <h5>Categoría prémium</H5>
                        <h4>Valoración</H4>
                        <h4>⭐⭐⭐⭐</H4>
                        <h5>Productos Vendidos</H5>
                        <h5>294</H5>
                        <input type = 'text'>
                        <button>Preguntar</button>
                    </div>
                </div>
                </div>
            </section>
            <h2>Descripción del producto</h2>
            <p>${data.description}</p>
            <h2>Productos similares</h2>
            <div id="related-products-container">
                ${relatedProductsHtml}
            </div>
        `

            document.getElementById('container').appendChild(container);

        // Al hacer clic en un producto relacionado, se almacena su ID en la variable selectedProductId.
        document.getElementById('related-products-container').addEventListener('click', (event) => {
            const clickedProduct = event.target.closest('.related-product');
            if (clickedProduct) {
                const selectedProductId = clickedProduct.getAttribute('data-product-id');
                // se recarga la página con los datos el producto.
                localStorage.setItem('productID',selectedProductId)
                location.reload()
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));
    
    //consiguiendo comentarios
    let urlComentarios = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`
    fetch(urlComentarios)
        .then(response => response.json())
        .then(data => {
            // Generando estrellas
            function starGenerator(score) {
                const maxStars = 5; // El número máximo de estrellas
                const fullStar = '⭐';
                const starRating = fullStar.repeat(score);
                return starRating;
            }

            let commentsArray = data.map(comment => `
                <li class='comment'>
                    <div class='title-container'>
                        <h4>${comment.user}</h4>
                        <h4>${comment.dateTime}</h4>
                    </div>
                    <p>${comment.description}</p>
                    <h4>${starGenerator(comment.score)}</h4>
                </li>
            `).join('');

            document.getElementById('coment-container').innerHTML = commentsArray;
        })
        .catch(error => console.error('Error fetching data:', error));

    // Mostrando en pantalla el comentario del usuario.
    document.getElementById('enviar-btn').addEventListener('click', () => {
        const input = document.getElementById('user-text').value;
        const select = document.getElementById('puntaje').value;
        let actualDate = new Date();
        let day = actualDate.getDate();
        let month = actualDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por eso se suma 1
        let year = actualDate.getFullYear();

        const coment = document.createElement('li');
        coment.className = 'comment';
        coment.innerHTML = `
            <div class='title-container'> 
                <h4>${localStorage.getItem('nombreUsuario')}</h4>
                <h4>${year}-${month}-${day}</h4>
                <h5 id='edited'></h5>
            </div>
            <p id='comment-text'>${input}</p>
            <h4>${select}</h4>
            <button class='edit-comment-btn'>Editar</button>
        `;

        document.getElementById('user-text').value = '';
        document.getElementById('coment-container').appendChild(coment);
        document.getElementById('comment-inputs-container').style.display = 'none';

        //guardando en el localStorage el comentario.
        localStorage.setItem('userComment',coment.innerHTML);
        console.log(localStorage.getItem('userComment'))

        // Editar comentario
        let editable = false;
        const editButton = coment.querySelector('.edit-comment-btn');
        const commentText = coment.querySelector('#comment-text');
        editButton.addEventListener('click', () => {
            const editedText = commentText.textContent;
            if (!editable) {
                commentText.contentEditable = 'true';
                editButton.textContent = 'Guardar';
                editable = true;
            } else {
                commentText.contentEditable = 'false';
                editButton.textContent = 'Editar';
                editable = false;
                commentText.textContent = editedText;
                document.getElementById('edited').textContent = 'editado';
            }
        })
    })
});
