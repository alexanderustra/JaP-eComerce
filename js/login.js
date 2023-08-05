document.addEventListener('DOMContentLoaded',()=>{

    const formulario = document.getElementById('login-form')
    let logueado = false;

    document.getElementById('iniciar-sesion-btn').addEventListener('click',(e)=>{
        e.preventDefault();
        let nombreDeUsuarioInput = formulario.querySelector('input[name="nombre_de_usuario"]');
        let contrasenaInput = formulario.querySelector('input[name="contrasena"]');
        if(nombreDeUsuarioInput.value === '' || contrasenaInput.value === '' ) {
            alert('Complete ambos campos')
        }
        else {
            window.location.href = '../index.html';
            logueado = true;
            localStorage.setItem('logueado', 'true');
        }
    })
    document.getElementById('inicio-btn').addEventListener('click',()=>{
        if(!logueado) {
            alert('tiene que iniciar sesión')
        }
    })
})