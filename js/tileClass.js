import {drawRectangle} from './drawClass'

//Tile class provides properties and methods for each invidual square on the canvas grid

export default class Tile {
  constructor(x, y, state, row, col){
    this.x = x; // X coordinate pixelwise
    this.y = y; // Y coordinate pixelwise
    this.state = state; // empty, wall, start, finish or path
    this.row = row; //row in the matrix
    this.col = col //col in the matrix
    this.available = true;
    this.inTheList = false;
    this.initialCost = 0; //property for Manhattan distance to the finish square(initialized as 0)
    this.accumulatedCost = 0; // number of steps up to current square (initialized as 0)
    this.totalCost;
    this.parent; // property needed to make a linked list and establish the path between start and finish
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




