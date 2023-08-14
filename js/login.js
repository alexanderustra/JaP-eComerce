document.addEventListener('DOMContentLoaded',()=>{

    //obtiene los datos del formulario
    const formulario = document.getElementById('login-form')
    let logueado = false;
    //mientras el usuario no esté logueado guardo en el almacenamiento local que no lo está.
    localStorage.setItem('logueado','false');

    document.getElementById('iniciar-sesion-btn').addEventListener('click',(e)=>{
        e.preventDefault();
        let emailInput = formulario.querySelector('input[name="user-email"]');
        let passwordInput = formulario.querySelector('input[name="password"]');
        if(emailInput.value === '' || !emailInput.value.includes('@') || passwordInput.value === '' ) {
            alert('Complete ambos campos')
        }
        else {
            //si completa ambos campos lo mando al index y guardo logueado como verdadero.
            window.location.href = './index.html';
            logueado = true;
            localStorage.setItem('logueado', 'true');
        }
    })
    // no permite cambiar de sección si no se loguea primero.
    let listaMenu = document.querySelectorAll('.nav-link');
    listaMenu.forEach(lista => lista.addEventListener('click', (e) => {
        if (!logueado) {
            e.preventDefault()
            alert('Tiene que iniciar sesión');
        }
    }));
})