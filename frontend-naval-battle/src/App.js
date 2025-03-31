import { Juego } from './juego.js';

const juego = new Juego();
const barcoUsuario = juego.jugador.agregarBarco("p1", 3);
const barcoMaquina = juego.maquina.agregarBarco("p2", 3);

// Colocar barcos en los tableros
juego.tableroUsuario.colocarBarco(barcoUsuario, 0, 1, true);
juego.tableroMaquina.colocarBarco(barcoMaquina, 4, 4, true);

juego.iniciar();

// Simulación de disparos (usuario y máquina)
juego.realizarDisparo(4, 4); // Usuario ataca
juego.turnoMaquina();        // Máquina ataca aleatoriamente
