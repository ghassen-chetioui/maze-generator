import Grid from "./Grid";
import Cell from "./Cell";
import { ENGINE_METHOD_PKEY_ASN1_METHS } from "constants";

export default class MazeResolver {
    private closedSet = new Array<Evaluation>()
    private openSet = new Array<Evaluation>()

    constructor(readonly grid: Grid, private start: Cell, private target: Cell) {
        console.log("start: " + JSON.stringify(start.position))
        console.log("target: " + JSON.stringify(target.position))
        const e = { cell: start, fScore: this.heuristicCostEstimate(start, target), gScore: 0 }
        this.openSet.push(e)
    }

    nextResolutionStep() {
        if (this.openSet.length > 0) {
            const current = this.openSet.reduce((e1, e2) => e1.fScore <= e2.fScore ? e1 : e2);
            console.log("current: " + JSON.stringify(current.cell.position));
            if (current.cell.position.eqauls(this.target.position)) {
                console.log("maze resolved")
                // TODO return path
            }
            this.openSet = this.openSet.filter(e => !e.cell.position.eqauls(current.cell.position))
            this.closedSet.push(current)
            current.cell.accessibleNeighbours().forEach(neighbour => {
                console.log("neighbour: " + JSON.stringify(neighbour.position))
                const neighbourNotAlreadyEvaluated = this.closedSet.find(e => e.cell.position.eqauls(neighbour.position)) === undefined
                if (neighbourNotAlreadyEvaluated) {
                    console.log("not evaluated neighbour: " + JSON.stringify(neighbour.position))
                }
            });
        } else {
            console.log("can not be resolved")
            // TODO could not be resolved
        }
    }


    private heuristicCostEstimate(cell: Cell, target: Cell) {
        return 0;
    }
}

interface Evaluation {
    cell: Cell
    fScore: number
    gScore: number
}