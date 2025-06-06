// Actualizar el año en la barra de estado
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Actualizar el año en el footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}); 