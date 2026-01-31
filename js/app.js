/**
 * Main application entry point
 * Initializes all components and starts the game
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize core components
    const gameState = new GameState();
    const winDetector = new WinDetector();
    const uiController = new UIController(gameState);
    const gameBoard = new GameBoard(gameState, uiController);

    // Make components globally available for cross-component communication
    window.gameState = gameState;
    window.winDetector = winDetector;
    window.uiController = uiController;
    window.gameBoard = gameBoard;

    // Initialize the display
    uiController.updateDisplay();
    gameBoard.renderBoard();

    // Log initialization for debugging
    console.log('Tic Tac Toe game initialized successfully');
    console.log('Game components:', {
        gameState: gameState,
        winDetector: winDetector,
        uiController: uiController,
        gameBoard: gameBoard
    });
});