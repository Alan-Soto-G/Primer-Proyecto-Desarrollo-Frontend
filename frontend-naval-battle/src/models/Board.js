document.addEventListener("DOMContentLoaded", async function () {  
    // Función para crear el tablero
    function createBoard(size) {
        const boardP1 = [];
        const boardM1 = [];
        let cellId = 1;
    
        for (let row = 0; row < size; row++) {
            const rowP1 = [];
            const rowM1 = [];
        
            for (let col = 0; col < size; col++) {
                const cellP1 = {
                    id: cellId,
                    status: "ship", // water, ship, hit, miss
                    ship: null,
                    player: "p1",
                    coordinates: { row, col }
                };
            
                const cellM1 = { 
                    ...JSON.parse(JSON.stringify(cellP1)), 
                    player: "p2" 
                };
            
                rowP1.push(cellP1);
                rowM1.push(cellM1);
                cellId++;
            }
            boardP1.push(rowP1);
            boardM1.push(rowM1);
        }
        
        return { boardP1, boardM1 };
    
    }
    
    function renderBoard(board, containerId) {
        const boardContainer = document.getElementById(containerId);
        boardContainer.innerHTML = ""; // Limpiar tablero
    
        // Añadir estilo de cuadrícula DINÁMICAMENTE
        const size = board.length;
        boardContainer.style.display = "grid";
        boardContainer.style.gridTemplateColumns = `repeat(${size}, minmax(25px, 1fr))`;
        
        // Recorrer todas las celdas
        board.forEach(row => {
            row.forEach(cell => {
                const button = document.createElement("button");
                button.className = "cell";
                
                // Asignar imagen según estado (usa "a" para agua)
                let image;
                switch(cell.status) {
                    case "a": 
                        image = "water.png";
                        break;
                    case "ship": 
                        image = "ship.png";
                        break;
                    case "hit": 
                        image = "hit.png";
                        break;
                    default: 
                        image = "missedShot.png";
                }
                
                button.innerHTML = `<img src="../assets/images/${image}" alt="${cell.status}">`;
                boardContainer.appendChild(button);
            });
        });
    }
    
    // Uso del código
    const { boardP1, boardM1 } = createBoard(11);
    renderBoard(boardP1, "board-p1");
    renderBoard(boardM1, "board-m1");
});