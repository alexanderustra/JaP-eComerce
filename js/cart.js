document.addEventListener('DOMContentLoaded', () => {
    //------------------------------Trayendo productos desde la API------------------------------//
    /*
        fetch('https://japceibal.github.io/emercado-api/user_cart/25801.json')
        .then(response => response.json())
        .then(data => {
           data.articles.forEach(product => {
                const li = document.createElement('li');
                li.className = 'product-list';
                li.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="info-container">
                    <div class="name-and-price">
                    <h2>${product.name}</h2>
                    <h2 class="product-cost">${product.unitCost} ${product.currency}</h2>
                    </div>
                    <h2 class="product-info product-name"> Cantidad : ${product.count}</h2>
                    <button class="cart" id ='delete'>
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                </div>
                `;
                document.getElementById('container').appendChild(li)
            })
        })
    */
    //--------------------------- añadiendo productos desde el local storage ---------------------------//
    let cart = JSON.parse(localStorage.getItem('cartArray'));
    cart.forEach(product => {
        console.log(product)
        fetch(`https://japceibal.github.io/emercado-api/products/${product}.json`)
            .then(response => response.json())
            .then(data => {
                //se puede usar una función para reutilizar la estructura. PENDIENTE
                const li = document.createElement('li');
                li.className = 'product-list';
                li.innerHTML = `
                <img src="${data.images[0]}" alt="${data.name}">
                <div class="info-container">
                    <div class="name-and-price">
                    <h2>${data.name}</h2>
                    <h2 class="product-cost">${data.cost} ${data.currency}</h2>
                    </div>
                    <h2 class="product-info product-name"> Cantidad : 1</h2>
                    <button class="cart delete-btns" product-id = '${product}'>
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                </div>
                `;
                document.getElementById('container').appendChild(li);

                //----------------------Eliminando productos del carrito----------------------//
                let deleteBtns = document.querySelectorAll('.delete-btns');
                deleteBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        btn.closest('.product-list').remove();
                        let productId = btn.getAttribute('product-id'); // Convertir a número
                        let index = cart.indexOf(productId);
                        console.log(index)
                        // macumba acá cuidao
                        if(cart.length > 2) {
                            if (index !== -1) {
                                cart.splice(index, 1);
                                localStorage.setItem('cartArray',JSON.stringify(cart))
                            }
                        }
                        else {
                            cart.splice(index + 1, 1);
                            localStorage.setItem('cartArray',JSON.stringify(cart))
                        }
                    });
                });


            })
            .catch(error => console.log(error));
    })
});