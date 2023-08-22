document.addEventListener("DOMContentLoaded", function(){

    //desafiate
    //si el usuario no inició sesión previamente, se lo enviará directo a login.html
    const logueado = localStorage.getItem('logueado');
    if (logueado === 'false') {
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

const emailForm = document.getElementById('login-form');
const userEmailInput = document.getElementById('user-email');

emailForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página

    const userEmail = userEmailInput.value; // Obtener el valor del correo electrónico ingresado

    // Almacenar el correo electrónico en localStorage
    localStorage.setItem('userEmail', userEmail);

    alert('Correo electrónico guardado con éxito.');
});
 // Obtener el correo electrónico almacenado en localStorage y mostrarlo en el campo de entrada
const storedEmail = localStorage.getItem('userEmail');
if (storedEmail) {
userEmailInput.value = storedEmail;
}