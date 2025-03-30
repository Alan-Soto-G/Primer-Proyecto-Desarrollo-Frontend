// src/core/ships/Ship.js
export default class Ship {
    constructor(length, type) {
        if (this.constructor === Ship) {
            throw new Error("Ship is an abstract class and cannot be instantiated");
        }
        
        if (!type || !length) {
            throw new Error("Ship type and length must be defined");
        }
        
        this.length = length;
        this.type = type;
        this.hits = 0;
        this.position = [];
        this.direction = null;
    }

    hit() {
        if (!this.isSunk()) {
            this.hits++;
            return true;
        }
        return false;
    }

    isSunk() {
        return this.hits >= this.length;
    }

    setPosition(startCoord, direction, cells) {
        this.startCoordinate = startCoord; // {row, col}
        this.direction = direction; // 'horizontal' or 'vertical'
        this.position = cells; // Array of {row, col}
    }

    getOccupiedCells() {
        return this.position;
    }
}