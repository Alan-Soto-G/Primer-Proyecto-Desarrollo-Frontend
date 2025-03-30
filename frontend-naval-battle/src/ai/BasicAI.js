// frontend-naval-battle/src/ai/BasicAI.js

/**
 * Clase que representa una IA básica para el juego de batalla naval
 */
export default class BasicAI {
    constructor() {
      this.attacks = new Set(); // Para registrar ataques previos
    }
  
    /**
     * Genera un ataque aleatorio que no se haya realizado antes
     * @param {number} boardSize - Tamaño del tablero
     * @returns {Object} Coordenadas { row, col } del ataque
     */
    makeRandomAttack(boardSize) {
      let row, col, attackKey;
      
      do {
        row = Math.floor(Math.random() * boardSize);
        col = Math.floor(Math.random() * boardSize);
        attackKey = `${row},${col}`;
      } while (this.attacks.has(attackKey));
      
      this.attacks.add(attackKey);
      return { row, col };
    }
  
    /**
     * Método principal para realizar un ataque
     * @param {number} boardSize - Tamaño del tablero
     * @returns {Object} Coordenadas del ataque { row, col }
     */
    attack(boardSize) {
      return this.makeRandomAttack(boardSize);
    }
  }