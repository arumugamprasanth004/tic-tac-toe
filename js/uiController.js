/**
 * UIController class manages UI updates and user interface elements
 * Handles status displays, messages, and UI state synchronization
 */
class UIController {
    constructor(gameState) {
        this.gameState = gameState;
        this.currentPlayerElement = document.getElementById('current-player');
        this.gameStatusElement = document.getElementById('game-status');
        this.resetButton = document.getElementById('reset-button');
        
        this.bindEvents();
    }

    /**
     * Bind UI events
     */
    bindEvents() {
        this.resetButton.addEventListener('click', () => this.handleReset());
    }

    /**
     * Update all UI displays based on current game state
     */
    updateDisplay() {
        this.updatePlayerDisplay();
        this.updateStatusMessage();
    }

    /**
     * Update the current player display
     */
    updatePlayerDisplay() {
        const gameStatus = this.gameState.getGameStatus();
        const currentPlayer = this.gameState.getCurrentPlayer();
        
        if (gameStatus === 'playing') {
            this.currentPlayerElement.textContent = `Player ${currentPlayer}'s Turn`;
            this.currentPlayerElement.style.color = currentPlayer === 'X' ? '#dc3545' : '#007bff';
        } else {
            // Game is finished, hide current player display
            this.currentPlayerElement.textContent = '';
        }
    }

    /**
     * Update the game status message
     */
    updateStatusMessage() {
        const gameStatus = this.gameState.getGameStatus();
        const winner = this.gameState.getWinner();
        
        // Clear previous classes
        this.gameStatusElement.classList.remove('winner', 'draw');
        
        switch (gameStatus) {
            case 'won':
                this.gameStatusElement.textContent = `🎉 Player ${winner} Wins! 🎉`;
                this.gameStatusElement.classList.add('winner');
                break;
                
            case 'draw':
                this.gameStatusElement.textContent = `🤝 It's a Draw! 🤝`;
                this.gameStatusElement.classList.add('draw');
                break;
                
            case 'playing':
            default:
                this.gameStatusElement.textContent = '';
                break;
        }
    }

    /**
     * Show a custom message
     * @param {string} message - Message to display
     * @param {string} type - Message type ('winner', 'draw', or default)
     */
    showMessage(message, type = '') {
        this.gameStatusElement.textContent = message;
        
        // Clear previous classes
        this.gameStatusElement.classList.remove('winner', 'draw');
        
        // Add new class if specified
        if (type) {
            this.gameStatusElement.classList.add(type);
        }
    }

    /**
     * Clear all status messages
     */
    clearMessages() {
        this.gameStatusElement.textContent = '';
        this.gameStatusElement.classList.remove('winner', 'draw');
    }

    /**
     * Handle reset button click
     */
    handleReset() {
        // Reset game state
        this.gameState.reset();
        
        // Clear board display
        window.gameBoard.clearBoard();
        
        // Update UI
        this.updateDisplay();
    }

    /**
     * Get UI elements for testing
     */
    getElements() {
        return {
            currentPlayer: this.currentPlayerElement,
            gameStatus: this.gameStatusElement,
            resetButton: this.resetButton
        };
    }
}