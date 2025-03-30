// src/app.js
import Game from './core/Game.js';
import BoardFactory from './factories/BoardFactory.js';
import BasicAI from './ai/BasicAI.js';
import TurnManager from './core/TurnManager.js';
import ScoreManager from './core/ScoreManager.js';
import GameRenderer from './ui/GameRenderer.js';

export default class NavalBattleApp {
  constructor() {
    // Configuración del juego
    this.config = {
      boardSize: 10,
      maxPlacementAttempts: 100
    };

    // Elementos del DOM
    this.domElements = {
      humanBoard: document.getElementById('human-board'),
      computerBoard: document.getElementById('computer-board'),
      messageDisplay: document.getElementById('message'),
      humanScore: document.getElementById('human-score'),
      computerScore: document.getElementById('computer-score'),
      restartBtn: document.getElementById('restart-btn')
    };

    // Verificar que existen los elementos del DOM
    this.validateDomElements();

    // Inicialización de dependencias
    this.boardFactory = new BoardFactory();
    this.aiStrategy = new BasicAI();
    this.turnManager = new TurnManager();
    this.scoreManager = new ScoreManager();

    // Creación del juego
    this.game = new Game(
      this.boardFactory,
      this.aiStrategy,
      this.turnManager,
      this.scoreManager,
      this.config
    );

    // Inicialización del renderizador
    this.renderer = new GameRenderer(
      this.game,
      this.domElements.humanBoard,
      this.domElements.computerBoard,
      this.domElements.messageDisplay
    );

    // Configurar listeners
    this.setupEventListeners();

    // Estado del juego
    this.isGameInitialized = false;
  }

  validateDomElements() {
    const missingElements = Object.entries(this.domElements)
      .filter(([_, element]) => !element)
      .map(([name]) => name);

    if (missingElements.length > 0) {
      throw new Error(`Elementos del DOM no encontrados: ${missingElements.join(', ')}`);
    }
  }

  setupEventListeners() {
    // Escuchar cambios en el marcador
    this.scoreManager.onUpdate(this.updateScores.bind(this));
    
    // Listener para el botón de reinicio
    this.domElements.restartBtn.addEventListener('click', this.restartGame.bind(this));
  }

  updateScores() {
    this.domElements.humanScore.textContent = this.scoreManager.scores.human;
    this.domElements.computerScore.textContent = this.scoreManager.scores.computer;
  }

  async initializeGame() {
    try {
      if (this.isGameInitialized) {
        this.resetGameState();
      }
      
      // Renderizar tableros vacíos primero
      this.renderer.setupBoards();
      
      // Configurar barcos
      await this.renderer.setupHumanShips();
      this.game.setupComputerShips();
      
      // Iniciar juego
      this.game.start();
      this.renderer.setupAttackListeners();
      
      this.isGameInitialized = true;
      this.domElements.messageDisplay.textContent = '¡Juego listo! Es tu turno.';
    } catch (error) {
      console.error('Error al inicializar el juego:', error);
      this.domElements.messageDisplay.textContent = 'Error al iniciar el juego. Por favor recarga la página.';
    }
  }

  resetGameState() {
    // Limpiar tableros
    this.domElements.humanBoard.innerHTML = '';
    this.domElements.computerBoard.innerHTML = '';
    
    // Reiniciar puntuaciones
    this.scoreManager.resetScores();
    this.updateScores();
    
    // Reiniciar estado del juego
    this.game.reset();
    this.renderer.reset();
    
    // Volver a renderizar tableros vacíos
    this.renderer.setupBoards();
  }

  restartGame() {
    if (confirm('¿Estás seguro de que quieres reiniciar el juego?')) {
      this.domElements.messageDisplay.textContent = 'Reiniciando juego...';
      setTimeout(() => {
        this.initializeGame();
      }, 500);
    }
  }

  start() {
    this.initializeGame().catch(error => {
      console.error('Error no manejado:', error);
    });
  }
}