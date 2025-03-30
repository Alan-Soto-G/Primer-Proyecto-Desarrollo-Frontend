// src/core/ScoreManager.js
export default class ScoreManager {
    constructor() {
      this.scores = {
        [Player.HUMAN]: 0,
        [Player.COMPUTER]: 0
      };
      this.listeners = [];
    }
  
    update(player, points) {
      this.scores[player] += points;
      this.notifyUpdate();
    }
  
    resetScores() {
      this.scores[Player.HUMAN] = 0;
      this.scores[Player.COMPUTER] = 0;
      this.notifyUpdate();
    }
  
    onUpdate(callback) {
      this.listeners.push(callback);
    }
  
    notifyUpdate() {
      this.listeners.forEach(callback => callback());
    }
  }