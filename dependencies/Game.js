import Board from './Board.js';

export default class Game {
    
    constructor(width = 7, height = 6) {
        this.width = width;
        this.height = height;
        this.board = new Board(width, height);
        this.attachListeners();
        this.currPlayer = 1;
        this.isOver = false;
        this.isStarted = false;
    }    

    attachListeners() {
        for (let row of this.board.cells.rows) {
            for (let cell of row.cells) {
                cell.addEventListener("click", (evt) => {
                    // get x from ID of clicked cell
                    const x = evt.target.id.split('-')[0];

                    // get next spot in column (if none, ignore click)
                    const y = this.findSpotForCol(x);
                    if (y === null) return;

                    // place piece in board and add to HTML table
                    this.board.board[x][y] = this.currPlayer;
                    this.placeInTable(x, y);

                    // check for win
                    if (this.checkForWin()) {
                        return this.endGame(`Player ${this.currPlayer} won!`);
                    }

                    // check for tie
                    if (
                        this.board.board.every((row) =>
                            row.every((cell) => cell)
                        )
                    ) {
                        return endGame("Tie!");
                    }

                    // switch players
                    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
                });
            }
        }
    }

    /** findSpotForCol: given column x, return top empty y (null if filled) */
    findSpotForCol(x) {
        for (let y = this.height - 1; y >= 0; y--) {
            if (!this.board.board[x][y]) {
                return y;
            }
        }
        return null;
    }
    /** placeInTable: update DOM to place piece into HTML table of board */
    placeInTable(x, y) {
        const piece = document.createElement("div");
        piece.classList.add("piece");
        piece.classList.add(`p${this.currPlayer}`);
        piece.style.top = -50 * (x + 5);

        const spot = document.getElementById(`${x}-${y}`);
        spot.append(piece);
    }

    /** endGame: announce game end */

    endGame(msg) {
        alert(msg);
    }

    /** checkForWin: check board cell-by-cell for "does a win start here?" */

    checkForWin() {
        const _win = (cells) => {
            // Check four cells to see if they're all color of current player
            //  - cells: list of four (y, x) cells
            //  - returns true if all are legal coordinates & all match currPlayer
            return cells.every(
                ([x, y]) =>
                    y >= 0 &&
                    y < this.board.height &&
                    x >= 0 &&
                    x < this.board.width &&
                    this.board.board[x][y] === this.currPlayer
            );
        };

        for (let y = 0; y < this.board.height; y++) {
            for (let x = 0; x < this.board.width; x++) {
                // get "check list" of 4 cells (starting here) for each of the different
                // ways to win
                const horiz = [
                    [x, y],
                    [x, y + 1],
                    [x, y + 2],
                    [x, y + 3],
                ];
                const vert = [
                    [x, y],
                    [x + 1, y],
                    [x+ 2, y],
                    [x + 3, y],
                ];
                const diagDR = [
                    [x, x],
                    [x + 1, y + 1],
                    [x + 2, y + 2],
                    [x + 3, y + 3],
                ];
                const diagDL = [
                    [x, x],
                    [x + 1, y - 1],
                    [x + 2, y - 2],
                    [x + 3, y - 3],
                ];

                // find winner (only checking each win-possibility as needed)
                if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                    this.isOver = true;
                    return true;
                }
            }
        }
    }
}
