import Maze from "./Maze";
import Cell from "./Cell";

export default class MazeResolver {

    private closedSet = new Array<Evaluation>()
    private openSet = new Array<Evaluation>()
    private resolution = Resolution.IN_PROGRESS;

    private current: Evaluation;

    constructor(readonly grid: Maze, private start: Cell, private target: Cell) {
        const e: Evaluation = { cell: start, fScore: this.heuristicCostEstimate(start, target), gScore: 0, previous: undefined }
        this.openSet.push(e)
    }

    nextResolutionStep() {
        if (this.openSet.length > 0) {
            this.current = this.openSet.reduce((e1, e2) => e1.fScore <= e2.fScore ? e1 : e2);
            if (this.current.cell.position.eqauls(this.target.position)) {
                console.log("maze resolved")
                this.resolution = Resolution.RESOLVED;
            }
            this.openSet = this.openSet.filter(e => !e.cell.position.eqauls(this.current.cell.position))
            this.closedSet.push(this.current)
            const accessibleNeighbours = this.current.cell.accessibleNeighbours();
            accessibleNeighbours.forEach(neighbour => {
                const neighbourNotAlreadyEvaluated = this.closedSet.find(e => e.cell.position.eqauls(neighbour.position)) === undefined
                if (neighbourNotAlreadyEvaluated) {
                    const gScore = this.current.gScore + this.computeDistance(this.current.cell, neighbour)
                    const discovered = this.openSet.find(e => e.cell.position.eqauls(neighbour.position))
                    if (!discovered) {
                        this.openSet.push({ cell: neighbour, gScore, fScore: gScore + this.heuristicCostEstimate(neighbour, this.target), previous: this.current })
                    } else if (gScore < discovered.gScore) {
                        discovered.gScore = gScore
                        discovered.fScore = discovered.gScore + this.heuristicCostEstimate(discovered.cell, this.target)
                        this.openSet = this.openSet.filter(e => !e.cell.position.eqauls(discovered.cell.position))
                        this.openSet.push(discovered)
                    }
                }
            });
        } else {
            this.resolution = Resolution.COULD_NOT_BE_RESOLVED;
        }
    }

    inCurrentPath(cell: Cell) {
        const currentPath = [];
        if (this.current) {
            currentPath.push(this.current.cell)
        }
        let current = this.current
        while (current && current.previous) {
            currentPath.push(current.previous.cell)
            current = current.previous
        }
        return currentPath.find(c => c.position.eqauls(cell.position)) !== undefined
    }

    resolutionStatus() {
        return this.resolution
    }

    private heuristicCostEstimate(cell: Cell, target: Cell) {
        return Math.abs(cell.position.x - target.position.x) + Math.abs(cell.position.y - target.position.y);
    }

    private computeDistance(current: Cell, neighbour: Cell): number {
        return 1;
    }

    inColsedSet(cell: Cell) {
        return this.closedSet.find(e => e.cell.position.eqauls(cell.position)) !== undefined
    }


    inOpenSet(cell: Cell) {
        return this.openSet.find(e => e.cell.position.eqauls(cell.position)) !== undefined
    }
}

interface Evaluation {
    cell: Cell
    fScore: number
    gScore: number
    previous: Evaluation | undefined
}

export enum Resolution {
    RESOLVED, IN_PROGRESS, COULD_NOT_BE_RESOLVED
}