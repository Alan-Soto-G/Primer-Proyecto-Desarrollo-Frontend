import Helper from './helper.js';
Helper.loadView('iniciarsesion', {});
/*document.addEventListener('DOMContentLoaded', function() {
    
    
    const fondo = document.getElementById('fondo');
    
    function ajustarFondo() {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        
        // Ajuste para iPad (relación de aspecto cercana a 4:3)
        if (windowWidth / windowHeight > 0.75 && windowWidth / windowHeight < 1.35) {
            fondo.style.backgroundSize = "100% 100%"; // Forzar estiramiento
        } else {
            fondo.style.backgroundSize = "cover"; // Comportamiento normal
        }
    }

    // Ejecutar al cargar y al redimensionar
    ajustarFondo();
    window.addEventListener('resize', ajustarFondo);
    window.addEventListener('orientationchange', ajustarFondo);
});
*/