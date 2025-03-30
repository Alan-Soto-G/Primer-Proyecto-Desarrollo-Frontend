// src/core/Board.js completo
import { CellState } from '../enums/CellState.js';

export default class Board {
    constructor(size = 10) {
        this.size = size;
        this.grid = this.initializeGrid();
        this.ships = [];
    }

    initializeGrid() {
        return Array.from({ length: this.size }, () => 
            Array(this.size).fill().map(() => ({
                state: CellState.WATER,
                ship: null
            }))
        );
    }

    placeShip(ship, startCoord, direction) {
        // Validación de parámetros
        if (!ship || !startCoord || !direction) {
            throw new Error("Parámetros incompletos para placeShip");
        }
        
        const { row, col } = startCoord;
        
        // Validación de coordenadas
        if (row === undefined || col === undefined) {
            throw new Error("Coordenadas inválidas");
        }

        if (!this.isValidPlacement(ship, row, col, direction)) {
            return false;
        }

        const shipCells = [];
        
        // Colocación del barco
        for (let i = 0; i < ship.length; i++) {
            const currentRow = direction === 'vertical' ? row + i : row;
            const currentCol = direction === 'horizontal' ? col + i : col;
            
            this.grid[currentRow][currentCol] = {
                state: CellState.SHIP,
                ship: ship
            };
            
            shipCells.push({ row: currentRow, col: currentCol });
        }
        
        ship.setPosition(startCoord, direction, shipCells);
        this.ships.push(ship);
        return true;
    }

    isValidPlacement(ship, row, col, direction) {
        // Validar que el barco quepa en el tablero
        if (direction === 'vertical' && row + ship.length > this.size) return false;
        if (direction === 'horizontal' && col + ship.length > this.size) return false;
        
        // Validar que no se solape con otros barcos
        for (let i = 0; i < ship.length; i++) {
            const currentRow = direction === 'vertical' ? row + i : row;
            const currentCol = direction === 'horizontal' ? col + i : col;
            
            if (this.grid[currentRow][currentCol].state !== CellState.WATER) {
                return false;
            }
        }
        
        return true;
    }

    // ... otros métodos del Board
}