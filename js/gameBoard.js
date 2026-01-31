/**
 * GameBoard class manages the visual game board and user interactions
 * Handles rendering, click events, and board updates
 */
class GameBoard {
    constructor(gameState, uiController) {
        this.gameState = gameState;
        this.uiController = uiController;
        this.boardElement = document.getElementById('game-board');
        this.cells = this.boardElement.querySelectorAll('.cell');
        
        this.bindEvents();
    }

    /**
     * Bind click events to board cells
     */
    bindEvents() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
    }

    /**
     * Handle cell click events
     * @param {number} index - Index of clicked cell
     */
    handleCellClick(index) {
        // Attempt to make the move
        const moveSuccessful = this.gameState.makeMove(index);
        
        if (moveSuccessful) {
            // Update the visual board
            this.renderBoard();
            
            // Update UI status
            this.uiController.updateDisplay();
        }
    }

    /**
     * Render the current board state to the DOM
     */
    renderBoard() {
        const board = this.gameState.getBoard();
        
        this.cells.forEach((cell, index) => {
            const value = board[index];
            
            // Clear previous content and classes
            cell.textContent = '';
            cell.classList.remove('x', 'o');
            
            // Add content and styling if cell has a value
            if (value) {
                cell.textContent = value;
                cell.classList.add(value.toLowerCase());
            }
        });
    }

    /**
     * Clear the board display
     */
    clearBoard() {
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    }

    /**
     * Get the board DOM element
     * @returns {HTMLElement} Board element
     */
    getBoardElement() {
        return this.boardElement;
    }

    /**
     * Get all cell elements
     * @returns {NodeList} Cell elements
     */
    getCells() {
        return this.cells;
    }
}