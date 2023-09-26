document.addEventListener('DOMContentLoaded', () => {
    
    fetch('https://japceibal.github.io/emercado-api/user_cart/25801.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
           data.articles.forEach(product => {
            console.log(product)
            console.log(product.count)
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
                    <button class="cart">
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                </div>
                `;
                document.getElementById('container').appendChild(li)
            })
        })
});