// src/core/ships/Cruiser.js (Crucero - 3 casillas)
import Ship from './Ship.js';

export default class Cruiser extends Ship {
    constructor() {
        super(3, 'cruiser');
    }
}