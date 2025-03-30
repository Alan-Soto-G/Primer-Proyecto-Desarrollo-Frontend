// src/core/TurnManager.js
export default class TurnManager {
    constructor() {
      this.currentPlayer = null;
      this.game = null;
    }
  
    start(firstPlayer) {
      this.currentPlayer = firstPlayer;
    }
  
    switch() {
      this.currentPlayer = this.currentPlayer === Player.HUMAN 
        ? Player.COMPUTER 
        : Player.HUMAN;
    }
  
    endGame() {
      this.currentPlayer = null;
    }
  }