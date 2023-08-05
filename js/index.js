document.addEventListener("DOMContentLoaded", function(){

    //desafiate
    const logueado = localStorage.getItem('logueado');
    if (!logueado) {
        window.location.href = '../login.html';
    }
    // desafiate

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    console.log()
});
