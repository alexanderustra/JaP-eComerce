document.addEventListener('DOMContentLoaded', () => {
    const logueado = localStorage.getItem('logueado');
    if (logueado === 'false' || logueado === null) {
        window.location.href = '../login.html';
    }
});