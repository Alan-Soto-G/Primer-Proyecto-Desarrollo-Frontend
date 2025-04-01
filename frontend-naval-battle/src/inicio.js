document.addEventListener('DOMContentLoaded', function() {
    const fondo = document.getElementById('fondo');
    
    function ajustarFondo() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const aspectRatio = windowWidth / windowHeight;

        // iPad (4:3) o pantallas cuadradas
        if (aspectRatio >= 1.3 && aspectRatio <= 1.34) {
            fondo.style.backgroundSize = "100% 100%"; // Estira al 100%
        } 
        // Móviles verticales (9:16)
        else if (aspectRatio < 0.75) {
            fondo.style.backgroundSize = "100% auto"; // Zoom horizontal
        } 
        // Pantallas ultra-wide (21:9)
        else if (aspectRatio > 1.77) {
            fondo.style.backgroundSize = "auto 100%"; // Zoom vertical
        } 
        // Default (16:9)
        else {
            fondo.style.backgroundSize = "cover";
        }
    }

    // Ejecutar al cargar y al redimensionar
    ajustarFondo();
    window.addEventListener('resize', ajustarFondo);
    window.addEventListener('orientationchange', ajustarFondo);
});