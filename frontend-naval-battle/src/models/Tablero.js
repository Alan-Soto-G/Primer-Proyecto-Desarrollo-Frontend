export class Tablero {
    constructor(filas = 10, columnas = 10) {
        this.filas = filas;
        this.columnas = columnas;
        this.matriz = Array.from({ length: filas }, () => Array(columnas).fill('a'));
        this.barcos = [];
    }

    colocarBarco(barco, fila, columna, horizontal = true) {
        if (horizontal) {
            for (let i = 0; i < barco.tamaño; i++) {
                this.matriz[fila][columna + i] = barco.id;
            }
        } else {
            for (let i = 0; i < barco.tamaño; i++) {
                this.matriz[fila + i][columna] = barco.id;
            }
        }
        this.barcos.push(barco);
    }

    atacar(fila, columna) {
        const celda = this.matriz[fila][columna];

        if (celda === 'a') {
            this.matriz[fila][columna] = 'b'; // Marca agua con bomba fallida
            return "¡Fallaste!";
        }

        const barcoImpactado = this.barcos.find(barco => barco.id === celda);
        if (barcoImpactado) {
            barcoImpactado.recibirImpacto();
            this.matriz[fila][columna] = `${celda}-h`; // Marca impacto en barco
            return barcoImpactado.estaHundido() ? `¡Hundiste un ${barcoImpactado.id}!` : "¡Impacto!";
        }

        return "Movimiento inválido.";
    }

    imprimir() {
        this.matriz.forEach(fila => console.log(fila.join(' ')));
        console.log('\n');
    }
}
