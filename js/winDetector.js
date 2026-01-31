/**
 * WinDetector class handles win and draw detection logic
 * Evaluates board state against winning patterns
 */
class WinDetector {
    constructor() {
        // Define all possible winning patterns
        this.winPatterns = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal top-left to bottom-right
            [2, 4, 6]  // Diagonal top-right to bottom-left
        ];
    }

    /**
     * Check if there's a winner on the board
     * @param {Array} board - Current board state
     * @returns {Object|null} Winner object with player and pattern, or null if no winner
     */
    checkForWin(board) {
        for (const pattern of this.winPatterns) {
            const [a, b, c] = pattern;
            
            // Check if all three positions have the same non-null value
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return {
                    winner: board[a],
                    winningPattern: pattern
                };
            }
        }
        
        return null;
    }

    /**
     * Check if there's a winner on the board (legacy method for backward compatibility)
     * @param {Array} board - Current board state
     * @returns {string|null} Winner ('X' or 'O') or null if no winner
     */
    checkForWinLegacy(board) {
        const result = this.checkForWin(board);
        return result ? result.winner : null;
    }

    /**
     * Check if the game is a draw (board full with no winner)
     * @param {Array} board - Current board state
     * @returns {boolean} True if game is a draw
     */
    checkForDraw(board) {
        // First check if there's a winner
        if (this.checkForWin(board)) {
            return false;
        }
        
        // Check if board is full (no null values)
        return board.every(cell => cell !== null);
    }

    /**
     * Get all winning patterns
     * @returns {Array} Array of winning patterns
     */
    getWinPatterns() {
        return [...this.winPatterns]; // Return copy to prevent modification
    }
}