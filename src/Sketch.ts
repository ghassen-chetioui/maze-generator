// Magic for p5 importing properly in TypeScript AND Webpack
import 'p5'; import Grid from './Grid';
const p5 = require("p5");


const sketch: p5 = new p5(() => { });
const grid = Grid.build(10);

sketch.setup = () => {
  sketch.createCanvas(400, 400)
}

sketch.draw = () => {
  sketch.background(50);
  console.log(grid.cells().length)
  grid.cells().forEach(cell => {
    sketch.stroke(255);
    sketch.noFill();
    sketch.rect(cell.position.x * 40, cell.position.y * 40, 40, 40);
  });
}