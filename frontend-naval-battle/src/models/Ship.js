class Ship {
    #type;
    #length;
    #armor;
    #sunk;
    #isDestroyed

    constructor(type, length, armor, sunk) {
        this.#type = type;
        this.#length = length;
        this.#armor = armor;
        this.#sunk = sunk;
        this.#isDestroyed = false;
    }

    // Getters
    getType() {
        return this.#type;
    }

    getLength() {
        return this.#length;
    }

    getArmor() {
        return this.#armor;
    }

    getSunk() {
        return this.#sunk;
    }

    getIsDestroyed() {
        return this.#isDestroyed;
    }

    // Setters
    setType(type) {
        this.#type = type;
    }

    setLength(length) {
        this.#length = length;
    }

    setArmor(armor) {
        this.#armor = armor;
    }

    setSunk(sunk) {
        this.#sunk = sunk;
    }

    setIsDestroyed(isDestroyed) {
        this.#isDestroyed = isDestroyed;
    }
}
