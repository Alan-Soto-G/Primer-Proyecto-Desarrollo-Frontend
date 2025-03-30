// src/ui/GameRenderer.js
import { CellState } from '../enums/CellState.js';
import { Player } from '../enums/Player.js';
import { GameState } from '../enums/GameState.js';
import ShipFactory from '../factories/ShipFactory.js';

export default class GameRenderer {
  constructor(game, humanBoardElement, computerBoardElement, messageElement) {
    this.game = game;
    this.humanBoardElement = humanBoardElement;
    this.computerBoardElement = computerBoardElement;
    this.messageElement = messageElement;
    this.currentShip = null;
    this.currentDirection = 'horizontal';
    this.shipPlacementResolve = null;
  }

  async initialize() {
    this.setupBoards();
    this.messageElement.textContent = 'Preparando juego...';
    return this;
  }

  setupBoards() {
    // Limpiar tableros
    this.humanBoardElement.innerHTML = '';
    this.computerBoardElement.innerHTML = '';
    
    // Crear celdas para ambos tableros
    const createCells = (boardElement) => {
      for (let row = 0; row < this.game.config.boardSize; row++) {
        for (let col = 0; col < this.game.config.boardSize; col++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          cell.dataset.row = row;
          cell.dataset.col = col;
          boardElement.appendChild(cell);
        }
      }
    };

    createCells(this.humanBoardElement);
    createCells(this.computerBoardElement);
  }

  async setupHumanShips() {
    const fleet = ShipFactory.createFleet();
    
    for (const ship of fleet) {
      this.currentShip = ship;
      this.updatePlacementMessage();
      
      await new Promise((resolve) => {
        this.shipPlacementResolve = resolve;
      });
    }
    
    this.messageElement.textContent = '¡Todos los barcos colocados! Comienza el juego.';
    this.game.start();
  }

  updatePlacementMessage() {
    this.messageElement.textContent = 
      `Coloca tu ${this.currentShip.type} (${this.currentShip.length} casillas). 
      Dirección: ${this.currentDirection} [Click para rotar]`;
  }

  setupEventListeners() {
    // Rotar dirección del barco
    this.messageElement.addEventListener('click', () => {
      if (this.game.state === GameState.SHIP_PLACEMENT) {
        this.currentDirection = this.currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
        this.updatePlacementMessage();
      }
    });

    // Colocación de barcos humanos
    this.humanBoardElement.querySelectorAll('.cell').forEach(cell => {
      cell.addEventListener('click', (e) => {
        if (this.game.state === GameState.SHIP_PLACEMENT && this.currentShip) {
          const row = parseInt(e.target.dataset.row);
          const col = parseInt(e.target.dataset.col);
          this.handleShipPlacement(row, col);
        }
      });
    });

    // Ataques al tablero de la computadora
    this.computerBoardElement.querySelectorAll('.cell').forEach(cell => {
      cell.addEventListener('click', (e) => {
        if (this.game.state === GameState.IN_PROGRESS && 
            this.game.turnManager.currentPlayer === Player.HUMAN) {
          const row = parseInt(e.target.dataset.row);
          const col = parseInt(e.target.dataset.col);
          this.handleHumanAttack(row, col);
        }
      });
    });
  }

  handleShipPlacement(row, col) {
    const placed = this.game.boards[Player.HUMAN].placeShip(
      this.currentShip,
      { row, col },
      this.currentDirection
    );

    if (placed) {
      this.renderBoards();
      this.shipPlacementResolve?.();
    } else {
      this.messageElement.textContent = '¡Posición inválida! Intenta otra ubicación.';
    }
  }

  async handleHumanAttack(row, col) {
    const result = this.game.humanAttack({ row, col });
    this.renderBoards();
    
    if (result.valid) {
      this.messageElement.textContent = this.getMessageForResult(result.result);
      
      if (!result.extraTurn) {
        setTimeout(() => this.handleComputerTurn(), 1000);
      }
    }
  }

  async handleComputerTurn() {
    const result = this.game.computerTurn();
    this.renderBoards();
    this.messageElement.textContent = `La máquina disparó: ${this.getMessageForResult(result)}`;
    
    if (result.extraTurn) {
      setTimeout(() => this.handleComputerTurn(), 1000);
    }
  }

  renderBoards() {
    this.renderBoard(this.game.boards[Player.HUMAN], this.humanBoardElement, true);
    this.renderBoard(this.game.boards[Player.COMPUTER], this.computerBoardElement, false);
  }

  renderBoard(board, containerElement, showShips) {
    containerElement.innerHTML = '';
    
    for (let row = 0; row < board.size; row++) {
      for (let col = 0; col < board.size; col++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        
        const cellData = board.grid[row][col];
        let cellState = cellData.state;
        
        // Ocultar barcos enemigos
        if (!showShips && cellState === CellState.SHIP) {
          cellState = CellState.WATER;
        }
        
        // Aplicar clases CSS según el estado
        cell.classList.add(cellState.toLowerCase());
        
        // Marcar barcos hundidos
        if (cellData.ship?.isSunk()) {
          cell.classList.add('sunk');
        }
        
        containerElement.appendChild(cell);
      }
    }
  }

  getMessageForResult(result) {
    const messages = {
      'hit': '¡Tocado!',
      'sunk': '¡Barco hundido!',
      'miss': 'Agua...',
      'invalid': 'Movimiento inválido'
    };
    return messages[result.type] || '';
  }

  reset() {
    this.setupBoards();
    this.currentShip = null;
    this.currentDirection = 'horizontal';
    this.shipPlacementResolve = null;
  }
}