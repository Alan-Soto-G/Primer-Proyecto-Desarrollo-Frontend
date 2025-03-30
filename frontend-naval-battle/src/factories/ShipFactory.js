// src/factories/ShipFactory.js
import Carrier from '../core/ships/Carrier.js';
import Battleship from '../core/ships/Battleship.js';
import Cruiser from '../core/ships/Cruiser.js';
import Submarine from '../core/ships/Submarine.js';

export default class ShipFactory {
    static createShip(type) {
        switch (type.toLowerCase()) {
            case 'carrier':
                return new Carrier();
            case 'battleship':
                return new Battleship();
            case 'cruiser':
                return new Cruiser();
            case 'submarine':
                return new Submarine();
            default:
                throw new Error(`Unknown ship type: ${type}`);
        }
    }

    static createFleet() {
        return [
            this.createShip('carrier'),     // 1x5
            this.createShip('battleship'),  // 1x4
            this.createShip('cruiser'),     // 2x3 (se creará otra instancia después)
            this.createShip('cruiser'),     // 2x3
            this.createShip('submarine'),   // 2x2
            this.createShip('submarine')    // 2x2
        ];
    }
}