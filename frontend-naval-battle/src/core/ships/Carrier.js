// src/core/ships/Submarine.js (Submarino - 2 casillas)
import Ship from './Ship.js';

export default class Submarine extends Ship {
    constructor() {
        super(2, 'submarine');
    }
}