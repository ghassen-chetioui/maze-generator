import Cell, { Position } from './Cell';
export default class Grid {

    private allCells: Cell[] = new Array();
    private currentCell: Cell;
    private constructor() { }

    cells() {
        return this.allCells;
    }

    static build(size: number) {
        let cells: Array<any> = [];
        const grid = new Grid()
        for (let i = 0; i < size; i++) {
            cells[i] = [];
            for (let j = 0; j < size; j++) {
                const cell = new Cell(new Position(i, j));
                cells[i][j] = cell;
                if (i > 0) {
                    const left = cells[i - 1][j];
                    cell.leftNeighbour(left);
                    left.rightNeighbour(cell);
                }
                if (j > 0) {
                    const top = cells[i][j - 1];
                    cell.topNeighbour(top);
                    top.bottomNeighbour(cell);
                }
            }
        }
        grid.currentCell = cells[0][0];
        cells.forEach(row => grid.allCells = grid.allCells.concat(row));
        return grid;
    }

}