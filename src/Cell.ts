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

    hasBeenVisited() {
        return this.visited;
    }

    visit() {
        this.visited = true;
    }

    unvisitedNeighbour() {
        const unvisited = [this.top, this.right, this.bottom, this.left].filter(neighbour => (neighbour instanceof Cell && !neighbour.visited));
        return unvisited.length > 0
            ? unvisited[Math.floor(Math.random() * unvisited.length)]
            : undefined;
    }

}

export class Position {
    constructor(readonly x: number, readonly y: number) { }
}