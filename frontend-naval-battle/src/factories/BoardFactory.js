import Board from '../core/Board.js';

export default class BoardFactory {
    createBoard(size) {
        return new Board(size);
    }
}