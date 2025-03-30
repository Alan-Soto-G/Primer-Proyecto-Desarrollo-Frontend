// src/core/ships/Battleship.js (Acorazado - 4 casillas)
import Ship from './Ship.js';

export default class Battleship extends Ship {
    constructor() {
        super(4, 'battleship');
    }
}