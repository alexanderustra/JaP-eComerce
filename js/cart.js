document.addEventListener('DOMContentLoaded', () => {

    const logueado = localStorage.getItem('logueado');
    if (logueado === 'false' || logueado === null) {
        window.location.href = '../login.html';
    }

    let userName = localStorage.getItem('nombreUsuario')

    document.getElementById('perfil-a').textContent = userName;
});