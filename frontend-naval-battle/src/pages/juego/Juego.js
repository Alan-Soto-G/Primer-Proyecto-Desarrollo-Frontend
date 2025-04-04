import { Tablero } from '../../models/Tablero.js';
import { Jugador } from '../../models/Jugador.js';

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
        this.barcoActual = 0;
        this.barcos = [5, 4, 3, 3, 2, 2]; // Barcos a colocar
        this.horizontal = true; // Orientación por defecto
        
        this.mostrarTableros();

        // Agregar eventos de clic para colocar barcos
        document.getElementById("board-p1").addEventListener("click", (event) => {
            const celda = event.target;
            if (!celda.classList.contains("cell")) return;

            const fila = parseInt(celda.dataset.fila);
            const columna = parseInt(celda.dataset.columna);
            
            this.colocarBarcoUsuario(fila, columna);
        });

        // Agregar evento para cambiar orientación del barco con una tecla
        document.addEventListener("keydown", (event) => {
            if (event.key === "r") { // Presiona "r" para rotar
                this.horizontal = !this.horizontal;
                console.log(`Orientación cambiada: ${this.horizontal ? "Horizontal" : "Vertical"}`);
            }
        });
    }

    colocarBarcoUsuario(fila, columna) {
        if (this.barcoActual >= this.barcos.length) {
            console.log("¡Todos los barcos han sido colocados!");
            return;
        }

        const longitud = this.barcos[this.barcoActual];
        const colocado = this.tableroUsuario.colocarBarco(fila, columna, longitud, this.horizontal);

        if (colocado) {
            console.log(`Barco de ${longitud} colocado en (${fila}, ${columna})`);
            this.barcoActual++;

            if (this.barcoActual >= this.barcos.length) {
                console.log("✅ Todos los barcos han sido colocados. ¡Inicia el juego!");
                this.colocarBarcosAleatoriamente(this.tableroMaquina);
                this.mostrarTableros();
            }
        } else {
            console.log("❌ No puedes colocar un barco aquí.");
        }
    }

    colocarBarcosAleatoriamente(tablero) {
        const barcos = [5, 4, 3, 3, 2, 2]; // Ejemplo de tamaños de barcos
        barcos.forEach(longitud => {
            let colocado = false;
            while (!colocado) {
                let fila = Math.floor(Math.random() * 10);
                let columna = Math.floor(Math.random() * 10);
                let horizontal = Math.random() < 0.5;
                colocado = tablero.colocarBarco(fila, columna, longitud, horizontal);
            }
        });
    }

    realizarDisparo(fila, columna) {
        const tableroObjetivo = this.turnoUsuario ? this.tableroMaquina : this.tableroUsuario;
        const resultado = tableroObjetivo.atacar(fila, columna);
        console.log(`🔹 ${this.turnoUsuario ? "Usuario" : "Máquina"} dispara a (${fila}, ${columna}): ${resultado}`);
        this.mostrarTableros();
        this.turnoUsuario = !this.turnoUsuario;
        if (!this.turnoUsuario) {
            setTimeout(() => this.turnoMaquina(), 1000);
        }
    }

    turnoMaquina() {
        let fila, columna;
        do {
            fila = Math.floor(Math.random() * 10);
            columna = Math.floor(Math.random() * 10);
        } while (this.tableroUsuario.matriz[fila][columna] === '💥' || this.tableroUsuario.matriz[fila][columna] === '❌');
        this.realizarDisparo(fila, columna);
    }

    mostrarTableros() {
        console.log("Tablero del Usuario:");
        this.tableroUsuario.imprimir();
        console.log("Tablero de la Máquina:");
        this.tableroMaquina.imprimir();
    }
/*
        import { Juego } from '../models/Juego.js';
        
        document.addEventListener("DOMContentLoaded", () => {
            const juego = new Juego();
            juego.iniciar(); // Inicializa el juego

            let colocandoBarcos = true; // Estado para saber si estamos colocando barcos

            document.getElementById("board-p1").addEventListener("click", (event) => {
                if (!colocandoBarcos) return; // Si ya se colocaron los barcos, ignorar
                
                const target = event.target.closest("button");
                if (!target) return;
                
                let fila = parseInt(target.dataset.row);
                let columna = parseInt(target.dataset.col);
                
                if (juego.colocarBarcoUsuario(fila, columna)) {
                    console.log("Barco colocado en:", fila, columna);
                }

                if (juego.barcosColocados()) {
                    colocandoBarcos = false;
                    console.log("Todos los barcos colocados, ¡empieza la batalla!");
                }
            });
            
            document.getElementById("board-m1").addEventListener("click", (event) => {
                if (colocandoBarcos) return; // No atacar si aún no se han colocado los barcos
                
                const target = event.target.closest("button");
                if (!target) return;
                
                let fila = parseInt(target.dataset.row);
                let columna = parseInt(target.dataset.col);
                
                juego.realizarDisparo(fila, columna);
            });
        });
   */
}
