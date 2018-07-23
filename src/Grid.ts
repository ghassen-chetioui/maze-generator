import Cell, { Position } from './Cell';
export default class Grid {

    private allCells: Array<Cell> = new Array();
    private currentCell: Cell;
    private stack: Array<Cell> = new Array<Cell>();
    private generated: boolean = false;
    private constructor() { }

    cells() {
        return this.allCells;
    }

    visitNextCell() {
        if (this.currentCell == null) {
            this.currentCell = this.allCells[0];
            this.currentCell.visit();
        } else {
            const unvisitedNeighbour = this.currentCell.unvisitedNeighbour();
            if (unvisitedNeighbour) {
                this.stack.push(this.currentCell);
                this.currentCell.removeBoundary(unvisitedNeighbour);
                unvisitedNeighbour.removeBoundary(this.currentCell);
                this.currentCell = unvisitedNeighbour;
                this.currentCell.visit();
            } else if (this.stack.length > 0) {
                this.currentCell = this.stack.pop();
            } else {
                this.generated = true;
            }
        }
    }

    hasBeenGenerated() {
        return this.generated;
    }

    isCurrentCell(cell: Cell) {
        return this.currentCell.position.eqauls(cell.position);
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

        cells.forEach(row => grid.allCells = grid.allCells.concat(row));
        return grid;
    }

}