import { Tablero } from '../models/Tablero.js';
import { Jugador } from '../models/Jugador.js';

export class Juego {
    constructor() {
        this.tableroUsuario = new Tablero();
        this.tableroMaquina = new Tablero();
        this.jugador = new Jugador("Usuario");
        this.maquina = new Jugador("Máquina");
        this.turnoUsuario = true;
    }

    iniciar() {
        console.log("¡El juego ha comenzado!");
        this.mostrarTableros();
    }

    realizarDisparo(fila, columna) {
        const tableroObjetivo = this.turnoUsuario ? this.tableroMaquina : this.tableroUsuario;
        const resultado = tableroObjetivo.atacar(fila, columna);
        console.log(`🔹 ${this.turnoUsuario ? "Usuario" : "Máquina"} dispara a (${fila}, ${columna}): ${resultado}`);
        this.mostrarTableros();
        this.turnoUsuario = !this.turnoUsuario;
    }

    turnoMaquina() {
        const fila = Math.floor(Math.random() * 10);
        const columna = Math.floor(Math.random() * 10);
        this.realizarDisparo(fila, columna);
    }

    mostrarTableros() {
        console.log("Tablero del Usuario:");
        this.tableroUsuario.imprimir();
        console.log("Tablero de la Máquina:");
        this.tableroMaquina.imprimir();
    }
}
