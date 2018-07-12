type Neighbour = Cell | undefined;

export default class Cell {

    private top: Neighbour;
    private right: Neighbour;
    private bottom: Neighbour;
    private left: Neighbour;
    private visited: boolean = false;

    constructor(readonly position: Position) { }

    topNeighbour(top: Neighbour) {
        this.top = top;
    }

    rightNeighbour(right: Neighbour) {
        this.right = right;
    }

    bottomNeighbour(bottom: Neighbour) {
        this.bottom = bottom;
    }

    leftNeighbour(left: Neighbour) {
        this.left = left;
    }
}

export class Position {
    constructor(readonly x: number, readonly y: number) { }
}