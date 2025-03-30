import { Player } from '../enums/Player.js';
import { GameState } from '../enums/GameState.js';  // Cambiado a importación nombrada
import ShipFactory from '../factories/ShipFactory.js';

export default class Game {
    constructor(
        boardFactory, 
        aiStrategy, 
        turnManager, 
        scoreManager,
        config = {
            boardSize: 10,
            maxPlacementAttempts: 100
        }
    ) {
        // Inyección de dependencias
        this.boardFactory = boardFactory;
        this.aiStrategy = aiStrategy;
        this.turnManager = turnManager;
        this.scoreManager = scoreManager;
        
        // Configuración
        this.config = config;
        
        // Estado del juego
        this.state = GameState.NOT_STARTED;
        this.boards = {};
        
        // Inicialización
        this.initializeGame();
    }

    initializeGame() {
        // Creación de tableros usando el factory
        this.boards[Player.HUMAN] = this.boardFactory.createBoard(this.config.boardSize);
        this.boards[Player.COMPUTER] = this.boardFactory.createBoard(this.config.boardSize);
        
        // Colocación inicial de barcos
        this.setupComputerShips();
        this.state = GameState.SHIP_PLACEMENT;
    }
    async setupHumanShipsUI(renderer) {
        this.renderer = renderer;
        await this.renderer.initialize();
    }

    setupComputerShips() {
        const fleet = ShipFactory.createFleet();
        
        fleet.forEach(ship => {
            let placed = false;
            let attempts = 0;
            
            while (!placed && attempts < this.config.maxPlacementAttempts) {
                const coords = this.getRandomCoordinates();
                const direction = this.getRandomDirection();
                placed = this.boards[Player.COMPUTER].placeShip(
                    ship, 
                    coords, 
                    direction
                );
                attempts++;
            }
            
            if (!placed) {
                throw new Error(`No se pudo colocar el barco ${ship.type} después de ${this.config.maxPlacementAttempts} intentos`);
            }
        });
    }
    
    start() {
        if (this.state !== GameState.SHIP_PLACEMENT) {
            throw new Error('El juego no está listo para comenzar');
        }
        
        this.state = GameState.IN_PROGRESS;
        this.turnManager.start(Player.HUMAN);
    }

    humanAttack(coordinates) {
        if (this.state !== GameState.IN_PROGRESS || 
            this.turnManager.currentPlayer !== Player.HUMAN) {
            return { valid: false, message: 'No es tu turno' };
        }

        const result = this.boards[Player.COMPUTER].receiveAttack(coordinates);
        this.processAttackResult(result, Player.HUMAN);
        
        if (this.checkGameOver()) {
            return { valid: true, result, gameOver: true };
        }
        
        return { 
            valid: true, 
            result,
            extraTurn: ['hit', 'sunk'].includes(result.type)
        };
    }

    computerTurn() {
        const coordinates = this.aiStrategy.getNextMove(this.boards[Player.HUMAN]);
        const result = this.boards[Player.HUMAN].receiveAttack(coordinates);
        this.processAttackResult(result, Player.COMPUTER);
        
        return {
            ...result,
            coords: coordinates,
            gameOver: this.checkGameOver(),
            extraTurn: ['hit', 'sunk'].includes(result.type)
        };
    }

    processAttackResult(result, player) {
        const points = result.type === 'hit' ? 10 : 
                      result.type === 'sunk' ? 30 : 0;
        
        if (points > 0) {
            this.scoreManager.update(player, points);
        }
    }

    checkGameOver() {
        const humanLost = this.boards[Player.HUMAN].allShipsSunk();
        const computerLost = this.boards[Player.COMPUTER].allShipsSunk();
        
        if (humanLost || computerLost) {
            this.state = GameState.FINISHED;
            this.turnManager.endGame();
            return true;
        }
        return false;
    }

    // Helpers
    getRandomCoordinates() {
        return {
            row: Math.floor(Math.random() * this.config.boardSize),
            col: Math.floor(Math.random() * this.config.boardSize)
        };
    }

    getRandomDirection() {
        return Math.random() > 0.5 ? 'horizontal' : 'vertical';
    }
    // En Game.js
    reset() {
        this.gameState = 'setup';
        // Otra lógica de reinicio necesaria
    }
}