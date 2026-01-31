/**
 * GameState class manages the core game state and logic
 * Handles board state, current player, and game status
 */
class GameState {
    constructor() {
        this.reset();
    }

    /**
     * Reset the game to initial state
     */
    reset() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameStatus = 'playing'; // 'playing', 'won', 'draw'
        this.winner = null;
    }

    /**
     * Get the current player
     * @returns {string} Current player ('X' or 'O')
     */
    getCurrentPlayer() {
        return this.currentPlayer;
    }

    /**
     * Get the current board state
     * @returns {Array} Board array with 9 elements
     */
    getBoard() {
        return [...this.board]; // Return copy to prevent direct modification
    }

    /**
     * Get the current game status
     * @returns {string} Game status ('playing', 'won', 'draw')
     */
    getGameStatus() {
        return this.gameStatus;
    }

    /**
     * Get the winner if game is won
     * @returns {string|null} Winner ('X', 'O') or null
     */
    getWinner() {
        return this.winner;
    }

    /**
     * Check if a cell is empty
     * @param {number} index - Cell index (0-8)
     * @returns {boolean} True if cell is empty
     */
    isCellEmpty(index) {
        return this.board[index] === null;
    }

    /**
     * Check if the game is active (not finished)
     * @returns {boolean} True if game is still active
     */
    isGameActive() {
        return this.gameStatus === 'playing';
    }

    /**
     * Make a move at the specified index
     * @param {number} index - Cell index (0-8)
     * @returns {boolean} True if move was successful
     */
    makeMove(index) {
        // Validate move
        if (!this.isValidMove(index)) {
            return false;
        }

        // Place the mark
        this.board[index] = this.currentPlayer;

        // Check for win or draw
        this.updateGameStatus();

        // Switch player if game is still active
        if (this.gameStatus === 'playing') {
            this.switchPlayer();
        }

        return true;
    }

    /**
     * Check if a move is valid
     * @param {number} index - Cell index (0-8)
     * @returns {boolean} True if move is valid
     */
    isValidMove(index) {
        // Check if index is valid
        if (index < 0 || index > 8) {
            return false;
        }

        // Check if game is active
        if (!this.isGameActive()) {
            return false;
        }

        // Check if cell is empty
        return this.isCellEmpty(index);
    }

    /**
     * Switch to the other player
     */
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    /**
     * Update game status based on current board state
     */
    updateGameStatus() {
        // Check for winner
        const winner = window.winDetector.checkForWin(this.board);
        if (winner) {
            this.gameStatus = 'won';
            this.winner = winner;
            return;
        }

        // Check for draw
        if (window.winDetector.checkForDraw(this.board)) {
            this.gameStatus = 'draw';
            return;
        }

        // Game continues
        this.gameStatus = 'playing';
    }
}