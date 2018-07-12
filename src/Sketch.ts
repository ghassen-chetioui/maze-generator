// Magic for p5 importing properly in TypeScript AND Webpack
import 'p5';
import Grid from './Grid';
const p5 = require("p5");


const sketch: p5 = new p5(() => { });

const sketchSize = 400;
const cellSize = 10;
const grid = Grid.build(Math.floor(sketchSize / cellSize));

sketch.setup = () => {
  sketch.createCanvas(sketchSize, sketchSize)
}

sketch.draw = () => {
  sketch.background(50);
  grid.cells().forEach(cell => {
    sketch.stroke(255);
    sketch.noFill();
    sketch.rect(cell.position.x * cellSize, cell.position.y * cellSize, cellSize, cellSize);
  });
}