// Almacenar el estado actual del modo oscuro en el localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('modo-nocturno', 'true');
    } else {
        localStorage.setItem('modo-nocturno', 'false');
    }


// Verificar el estado del modo nocturno al cargar la página
function checkDarkMode() {
    const modoNocturno = localStorage.getItem('modo-nocturno');
    const body = document.body;

    if (modoNocturno === 'true') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

// Agregar un evento de clic al botón de cambio de modo
const toggleModeButton = document.getElementById('toggle-mode');
if (toggleModeButton) {
    toggleModeButton.addEventListener('click', toggleDarkMode);
}

// Aseguramos que cargue el modo oscuro al cargar la página
window.addEventListener('DOMContentLoaded', checkDarkMode);

