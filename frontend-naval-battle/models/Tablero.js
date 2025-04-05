export class Tablero {
    constructor(filas = 10, columnas = 10) {
        this.filas = filas;
        this.columnas = columnas;
        this.matriz = Array.from({ length: filas }, () => Array(columnas).fill('a'));
        this.barcos = [];
    }

    colocarBarco(fila, columna, longitud, horizontal) {
        if (this.puedeColocarBarco(fila, columna, longitud, horizontal)) {
            for (let i = 0; i < longitud; i++) {
                if (horizontal) {
                    this.matriz[fila][columna + i] = '🚢';
                } else {
                    this.matriz[fila + i][columna] = '🚢';
                }
            }
            return true;
        }
        return false;
    }

    puedeColocarBarco(fila, columna, longitud, horizontal) {
        for (let i = 0; i < longitud; i++) {
            let f = horizontal ? fila : fila + i;
            let c = horizontal ? columna + i : columna;

            if (f >= this.tamaño || c >= this.tamaño || this.matriz[f][c] === '🚢') {
                return false;
            }
        }
        return true;
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
