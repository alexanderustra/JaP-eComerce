document.addEventListener('DOMContentLoaded', () => {
    const logueado = localStorage.getItem('logueado');
    if (logueado === 'false' || logueado === null) {
        window.location.href = '../login.html';
    }
    document.getElementById('perfil-a').textContent = localStorage.getItem('nombreUsuario');

    //consiguiendo info del producto
    let productId = localStorage.getItem('productID');
    console.log(productId)
    let urlPoducto = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
    fetch(urlPoducto)
    .then(response => response.json())
    .then(data => { 
        console.log(data)
        let container = document.createElement('DIV');
        container.innerHTML = `
            <h1>${data.name} </h1>
            <img src = '${data.images[0]}'> </img>
            <p>${data.cost} ${data.currency} </p>
            <p>Vendidos: ${data.soldCount}</p>
            <h2>Descripción del producto </h2>
            <p>${data.description}</p>
            <h2>Productos similares </h2>
            <div>
                <div>
                    <h3>${data.relatedProducts[0].name}</h3>
                    <img src = '${data.relatedProducts[0].image}'></img>
                </div>
                <div>
                    <h3>${data.relatedProducts[1].name}</h3>
                    <img src = '${data.relatedProducts[1].image}'></img>
                </div>
            </div>
            
        `
        document.getElementById('container').appendChild(container)
    })
    .catch(error => console.error('Error fetching data:', error));

    //consiguiendo comentarios
    let urlComentarios = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`
    fetch(urlComentarios)
    .then(response => response.json())
    .then(data => { 
        console.log(data)
        data.forEach(coment =>{
            console.log(coment)
            const list = document.createElement('LI');
            list.style.backgroundColor = 'grey'
            list.innerHTML = `
                <h4>${coment.user}</h4>
                <h4>${coment.dateTime}</h4>
                <p>${coment.description}</p>
                <h4>Puntuación: ${coment.score}</h4>
            `
            document.getElementById('coment-container').appendChild(list)
        })
    })
    .catch(error => console.error('Error fetching data:', error));

    document.getElementById('enviar-btn').addEventListener('click',()=>{
        let input = document.getElementById('user-text').value;
        let select = document.getElementById('puntaje').value;
        var fechaActual = new Date();

        var day = fechaActual.getDate();
        var month = fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por eso se suma 1
        var year = fechaActual.getFullYear();
        let coment = document.createElement('li');
        coment.innerHTML = `
            <h4>${localStorage.getItem('nombreUsuario')}</h4>
            <h4>${year}-${month}-${day}</h4>
            <p>${input}</p>
            <h4>Puntuación: ${select}</h4>
        `
        document.getElementById('coment-container').appendChild(coment)
    })
});