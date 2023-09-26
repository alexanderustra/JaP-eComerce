document.addEventListener('DOMContentLoaded',()=>{

    //obtiene los datos del formulario
    const formulario = document.getElementById('login-form')
    let logueado = false;
    //mientras el usuario no esté logueado se guarda en el almacenamiento local que no lo está.
    localStorage.setItem('logueado','false');
    //conseguir los datos del registro.
    let userData = localStorage.getItem('user-data').split(',');
    console.log(userData[3])

    document.getElementById('iniciar-sesion-btn').addEventListener('click',(e)=>{
        e.preventDefault();
        //al hacer click en el botón iniciar sesión se verifica que ningún campo esté vacío.
        let userNameInput = formulario.querySelector('input[name="user-name"]');
        let passwordInput = formulario.querySelector('input[name="password"]');

        if(userNameInput.value === userData[0] && passwordInput.value === userData[3] ) {
            logueado = true;
            localStorage.setItem('logueado', 'true');
            window.location.href = './index.html';
        }
        else {
           alert('datos incorectos')
        }
    })
    // no permite cambiar de pestaña si no se loguea primero.
    let listaMenu = document.querySelectorAll('.nav-link');
    listaMenu.forEach(lista => lista.addEventListener('click', (e) => {
        if (!logueado) {
            e.preventDefault()
            alert('Tiene que iniciar sesión');
        }
    }));
    //llevar al registro
    document.getElementById('sign-in-btn').addEventListener('click',()=>{
        window.location.href = './sign-in.html';
    })
})