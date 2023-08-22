const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

const userForm = document.getElementById('login-form');
const userInfo = document.getElementById('user-email');

// Al cargar la página, verifica si hay un nombre de usuario almacenado y muéstralo
window.onload = function () {
    const storedUsername = localStorage.getItem('user-email');
    if (storedUsername) {
        userInfo.textContent = `Bienvenido, ${storeduser-email} | `;
    }
};

// Manejar el envío del formulario de inicio de sesión
userForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('user-email').value;
    
    // Almacena el nombre de usuario en el almacenamiento local
    localStorage.setItem('user-email', username);

    // Muestra el nombre de usuario en la barra de navegación
    userInfo.textContent = `Bienvenido, ${user-email} | `;
});