export default class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.board = this.makeBoard(width, height);
        this.cells = this.makeHtmlBoard();
    }

    /** makeBoard: create in-JS board structure:
     *   board = array of rows, each row is array of cells  (board[y][x])
     */
    makeBoard(width, height) {
        let board = [];
        for (let y = 0; y < height; y++) {
            board.push(Array.from({ length: width }));
        }
        return board;
    }

    /** makeHtmlBoard: make HTML table and row of column tops. */
    makeHtmlBoard() {
        const board = document.getElementById("board");

        // make main part of board
        for (let y = 0; y < this.height; y++) {
            const row = document.createElement("tr");
            for (let x = 0; x < this.width; x++) {
                const cell = document.createElement("td");
                cell.setAttribute("id", `${x}-${y}`);
                row.append(cell);
            }
            board.append(row);
        }
        return board;
    }
    
}
