import {drawRectangle} from './drawClass'

export default class Tile {
  constructor(x, y, state, row, col){
    this.x = x; // X coordinate pixelwise
    this.y = y; // Y coordinate pixelwise
    this.state = state;
    this.row = row; //row in the matrix
    this.col = col //col in the matrix
    this.available = true;
    this.inTheList = false;
    this.initialCost = 0;
    this.accumulatedCost = 0;
    this.totalCost;
    this.parent;
  }
  
  draw(state = 'empty') {
    drawRectangle(this.x, this.y, state)
  }

  reset(state = 'empty') {
    this.state = state;
    this.initialCost = 0;
    this.accumulatedCost = 0;
    this.totalCost = undefined;
    this.inTheList = false
    this.available = true
    this.parent = undefined
    this.draw(this.state)
  }
}




