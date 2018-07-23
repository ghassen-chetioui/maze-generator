// Magic for p5 importing properly in TypeScript AND Webpack
import 'p5';
import Grid from './Grid';
import Cell, { Boundary } from './Cell';
import MazeResolver, { Resolution } from './MazeResolver';
const p5 = require("p5");


const sketch: p5 = new p5(() => { });

const sketchSize = 900;
const cellSize = 20;
const grid = Grid.build(Math.floor(sketchSize / cellSize));
const start = grid.cells()[0];
const target = grid.cells()[grid.cells().length - 1];
const resolver = new MazeResolver(grid, start, target);

sketch.setup = () => {
  sketch.createCanvas(sketchSize, sketchSize);
  sketch.frameRate(50)
}

sketch.draw = () => {
  sketch.background(50);
  if (!grid.hasBeenGenerated()) {
    grid.visitNextCell();
  } else if (resolver.resolutionStatus() === Resolution.IN_PROGRESS) {
    // sketch.frameRate(1)
    resolver.nextResolutionStep()
  } else {
    sketch.noLoop();
  }
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
      sketch.fill(50, 0, 255, 100);
    }
    else {
      sketch.fill(255, 0, 255, 100);
    }
  } else {
    sketch.noFill();
  }

  if (resolver.inCurrentPath(cell)) {
    sketch.fill(0, 0, 255, 100)
  }

  sketch.rect(x, y, cellSize, cellSize);
}