document.addEventListener('DOMContentLoaded',()=>{

    //obtiene los datos del formulario
    const formulario = document.getElementById('login-form')
    let logueado = false;
    //mientras el usuario no esté logueado se guarda en el almacenamiento local que no lo está.
    localStorage.setItem('logueado','false');
    console.log(logueado)

    document.getElementById('iniciar-sesion-btn').addEventListener('click',(e)=>{
        e.preventDefault();
        //al hacer click en el botón iniciar sesión se verifica que ningún campo esté vacío.
        let userNameInput = formulario.querySelector('input[name="user-name"]');
        let passwordInput = formulario.querySelector('input[name="password"]');
        if(userNameInput.value === '' || passwordInput.value === '' ) {
            alert('Complete ambos campos')
        }
        else {
            //si completa ambos campos se redirije al usuario al index y se guarda logueado como verdadero.
            window.location.href = './index.html';
            logueado = true;
            localStorage.setItem('logueado', 'true');
            localStorage.setItem('nombreUsuario',userNameInput.value);
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
})