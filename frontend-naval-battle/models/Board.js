/*document.addEventListener("DOMContentLoaded", async function () { // Esperar a que el DOM esté completamente cargado 

    function createBoard(size) { // Función para crear el tablero

        // Crear tableros para dos jugadores
        const boardP1 = [];
        const boardM1 = [];

        let cellId = 1; // ID de celda inicial
    
        // Crear tableros de tamaño size x size
        // Cada celda tiene un ID único, estado y jugador
        for (let row = 0; row < size; row++) {

            // Crear filas para ambos jugadores
            const rowP1 = [];
            const rowM1 = [];

            for (let col = 0; col < size; col++) {// Crear celdas para ambos jugadores

                // Crear celda para jugador 1 (visible)
                const cellP1 = {
                    id: cellId, // ID único para cada tablero
                    status: "ship", // w (water), s (ship), h (hit), m (missedShot)      <-------------------- PARA VER CAMBIOS SOLO MODIFICAR AQUI
                    visible: true, // Visible para el jugador 1
                    ship: null, // Barco asociado (null inicialmente)
                    player: "p1", // Jugador 1
                };

                // Crear celda para jugador 2 (invisible inicialmente)
                const cellM1 = {
                    ...JSON.parse(JSON.stringify(cellP1)), player: "p2", // Copiar propiedades de cellP1
                    visible: false, // Ocultar inicialmente para el jugador 2
                };
                
                // Añadir celda a la fila del jugador 1 y del jugador 2 a la fila actual
                rowP1.push(cellP1);
                rowM1.push(cellM1);

                cellId++; // Incrementar ID de celda para la siguiente celda
            }
            // Añadir fila al tablero del jugador 1 y del jugador 2
            boardP1.push(rowP1); 
            boardM1.push(rowM1); 
        }
        return { boardP1, boardM1 }; // Devolver ambos tableros
    }
    
    // Función para renderizar el tablero en el contenedor especificado
    // El contenedor debe tener un ID único
    function renderBoard(board, containerId, option) {
        
        const boardContainer = document.getElementById(containerId);// Obtener el contenedor del tablero por su ID
        boardContainer.innerHTML = "";// Limpiar el contenido del contenedor antes de renderizar
    
        // Añadir estilo de cuadrícula dinámicamente
        const size = board.length; // Obtener el tamaño del tablero
        boardContainer.style.display = "grid"; // Establecer el contenedor como cuadrícula
        boardContainer.style.gridTemplateColumns = `repeat(${size}, minmax(25px, 1fr))`; // Definir columnas de cuadrícula
        
        // Recorrer todas las celdas
        board.forEach(row => { // Para cada fila del tablero
            row.forEach(cell => { // Para cada celda de la fila

                // Asignar imagen según estado (usa "w" para agua)
                let image; // Variable para almacenar la imagen según el estado de la celda
                switch(cell.status) {
                    case "a": 
                        image = "water.png"; // Agua
                        break;
                    case "ship": 
                        if (cell.visible) { // Si la celda es visible
                            image = "ship.png"; // Barco
                            
                        }
                        else { // Si la celda no es visible
                            image = "water.png"; // Barco oculto
                        }
                        break;
                    case "hit": 
                        image = "hit.png"; // Golpe
                        break;
                    default: 
                        image = "missedShot.png"; // Disparo fallido
                }
                if (option == 2 & cell.player == "p2") { 
                    // Si es opción 2 y jugador p2, renderizar normalmente con botón
                    const button = document.createElement("button"); // Crear botón para la celda
                    button.className = "cell"; // Clase CSS para estilizar el botón
                    button.innerHTML = `<img src="../assets/images/${image}" alt="${cell.status}">`; // Asignar imagen al botón según el estado de la celda
                    boardContainer.appendChild(button); // Añadir el botón al contenedor del tablero

                }else if (option == 2 & cell.player == "p1") { 

                    // Si es opción 2 y jugador p1, mostrar solo la imagen (sin botón)
                    const imgContainer = document.createElement("div"); // Crear un contenedor para la imagen
                    imgContainer.className = "cell-image"; // Clase CSS para estilizar si es necesario
                    imgContainer.innerHTML = `<img src="../assets/images/${image}" alt="${cell.status}">`; // Asignar imagen al contenedor según el estado de la celda
                    boardContainer.appendChild(imgContainer);   // Añadir el contenedor de imagen al contenedor del tablero

                }else{
                    // Caso por defecto (renderizado normal con botón)
                    const button = document.createElement("button");
                    button.className = "cell";
                    button.innerHTML = `<img src="../assets/images/${image}" alt="${cell.status}">`; 
                    boardContainer.appendChild(button);
                }

            });
        });
    }
    
    // Uso del código
    const { boardP1, boardM1 } = createBoard(11);//<-------------------- PARA VER CAMBIOS SOLO MODIFICAR AQUI
    renderBoard(boardP1, "board-p1", 2); //<-------------------- PARA VER CAMBIOS SOLO MODIFICAR AQUI
    renderBoard(boardM1, "board-m1", 2); //<-------------------- PARA VER CAMBIOS SOLO MODIFICAR AQUI
});*/