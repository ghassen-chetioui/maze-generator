// Magic for p5 importing properly in TypeScript AND Webpack
import 'p5';
import Grid from './Grid';
import Cell from './Cell';
const p5 = require("p5");


const sketch: p5 = new p5(() => { });

const sketchSize = 400;
const cellSize = 20;
const grid = Grid.build(Math.floor(sketchSize / cellSize));

sketch.setup = () => {
  sketch.createCanvas(sketchSize, sketchSize);
  sketch.frameRate(10)
}

sketch.draw = () => {
  sketch.background(50);
  grid.visitNextCell();
  grid.cells().forEach(cell => {
    sketch.stroke(255);
    sketch.line(cell.position.x * cellSize, cell.position.y * cellSize, cell.position.x * cellSize + cellSize, cell.position.y * cellSize)
    sketch.line(cell.position.y * cellSize + cellSize, cell.position.x * cellSize, cell.position.y * cellSize + cellSize, cell.position.x * cellSize + cellSize)
    sketch.line(cell.position.y * cellSize + cellSize, cell.position.x * cellSize + cellSize, cell.position.y * cellSize, cell.position.x * cellSize + cellSize)
    sketch.line(cell.position.x * cellSize, cell.position.y * cellSize + cellSize, cell.position.x * cellSize, cell.position.y * cellSize)
    if (cell.hasBeenVisited()) {
      sketch.noStroke();
      sketch.fill(255, 0, 255, 100);
    } else {
      sketch.noFill();
    }
    sketch.rect(cell.position.x * cellSize, cell.position.y * cellSize, cellSize, cellSize);
  });

}