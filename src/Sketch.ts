// Magic for p5 importing properly in TypeScript AND Webpack
import 'p5';
import Grid from './Grid';
import Cell, { Boundary } from './Cell';
const p5 = require("p5");


const sketch: p5 = new p5(() => { });

const sketchSize = 800;
const cellSize = 20;
const grid = Grid.build(Math.floor(sketchSize / cellSize));

sketch.setup = () => {
  sketch.createCanvas(sketchSize, sketchSize);
  sketch.frameRate(20)
}

sketch.draw = () => {
  sketch.background(50);
  grid.visitNextCell();
  grid.cells().forEach(cell => drawCell(cell));
}

const drawCell = (cell: Cell) => {
  sketch.stroke(255);
  const x = cell.position.x * cellSize;
  const y = cell.position.y * cellSize;
  if (cell.hasBoundary(Boundary.TOP)) sketch.line(x, y, x + cellSize, y)
  if (cell.hasBoundary(Boundary.RIGHT)) sketch.line(x + cellSize, y, x + cellSize, y + cellSize)
  if (cell.hasBoundary(Boundary.BOTTOM)) sketch.line(x + cellSize, y + cellSize, x, y + cellSize)
  if (cell.hasBoundary(Boundary.LEFT)) sketch.line(x, y + cellSize, x, y)

  if (cell.hasBeenVisited()) {
    sketch.noStroke();
    if (grid.isCurrentCell(cell)) {
      sketch.fill(50, 0, 255, 255);
    }
    else {
      sketch.fill(255, 0, 255, 100);
    }
  } else {
    sketch.noFill();
  }
  sketch.rect(x, y, cellSize, cellSize);
}