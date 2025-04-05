export class Barco {
    constructor(id, tamaño) {
        this.id = id;
        this.tamaño = tamaño;
        this.impactos = 0;
    }

    recibirImpacto() {
        this.impactos++;
    }

    estaHundido() {
        return this.impactos >= this.tamaño;
    }
}
