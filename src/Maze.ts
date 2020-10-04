import Cell, { Position } from './Cell';

export default class Maze {


    private currentCell: Cell;
    private stack: Array<Cell> = new Array<Cell>();
    private generated: boolean = false;

    private constructor(readonly cells: Array<Cell>) { }

    visitNextCell() {
        if (this.currentCell == null) {
            this.currentCell = this.cells[0];
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
        let rows: Array<any> = [];
        for (let i = 0; i < size; i++) {
            rows[i] = [];
            for (let j = 0; j < size; j++) {
                const cell = new Cell(new Position(i, j));
                rows[i][j] = cell;
                if (i > 0) {
                    const left = rows[i - 1][j];
                    cell.leftNeighbour(left);
                    left.rightNeighbour(cell);
                }
                if (j > 0) {
                    const top = rows[i][j - 1];
                    cell.topNeighbour(top);
                    top.bottomNeighbour(cell);
                }
            }
        }

        const cells = rows.reduce((r1, r2) => r1.concat(r2), []);

        return new Maze(cells);
    }

}