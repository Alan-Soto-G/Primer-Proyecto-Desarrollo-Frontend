import { Barco } from '../models/Barco';

export class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.barcos = [];
    }

    agregarBarco(id, tamaño) {
        const barco = new Barco(id, tamaño);
        this.barcos.push(barco);
        return barco;
    }
}
