import {tileH} from './constants'
import {tileW} from './constants'
import {numberOfRows} from './constants'
import {numberOfCols} from './constants'
import {canvas} from './domCache'

export default class MouseEvents{
  constructor(gridInstance){
    this.grid = gridInstance.grid;
    this.mouseMoveWrapper = (e) => this.move(e) // need to wrap the function to be able to remove the event listener
    this.moveSource; 
    this.previousRow;
    this.previousCol;
  }
  
  down(e) {
    e = e || window.event;
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    
    canvas.addEventListener("mousemove", this.mouseMoveWrapper);

    for (let row = 0; row < numberOfRows; row++) {
      for (let col = 0; col < numberOfCols; col++) {
        let currentTile = this.grid[row][col];
        if (this.isEventTarget(currentTile, x, y)) {
          if (currentTile.state === 'start') { // if event target is start or finish, we only set moveSource property to be able to move them with mouse move
            this.moveSource = 'start';
          } else if (currentTile.state === 'finish') {
            this.moveSource = 'finish';
          } else { // if event target is empty square or a wall, toggle states and redraw
            currentTile.state = currentTile.state === 'empty' ? 'wall' : 
                                currentTile.state === 'wall' ? 'empty' :
                                currentTile.state
            currentTile.draw(currentTile.state)
          }
        this.previousRow = row;
        this.previousCol = col;
        }
      }
    }  
  }

  move (e){
    e = e || window.event;
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;
    for (let row = 0; row < numberOfRows; row++) {
      for (let col = 0; col < numberOfCols; col++) {
        let currentTile = this.grid[row][col];
        if (this.isEventTarget(currentTile, x, y)) {
          if (this.moveSource === 'start' || this.moveSource === 'finish') {//if previous square was start or finish
            let previousTile = this.grid[this.previousRow][this.previousCol];
            if (currentTile.state === 'empty') { // if current square is empty
              currentTile.state = this.moveSource // make it either start or finish (depends on the source)
              currentTile.draw(this.grid[row][col].state) // draw it
              previousTile.state = 'empty'; // make previous square empty
              previousTile.draw() // draw it
            } else {
              return
            }
          } else { // or just toggle empty square with wall
            currentTile.state = currentTile.state === 'empty' ? 'wall' : 
                                currentTile.state === 'wall' ? 'empty' :
                                currentTile.state
            currentTile.draw(currentTile.state)
          }
          this.previousRow = row;
          this.previousCol = col;
        }
      }
    }  
  }

  up(){
    this.moveSource = null;
    this.previousRow = null
    this.previousCol = null
    canvas.removeEventListener('mousemove', this.mouseMoveWrapper)
  }

  isEventTarget(tile, x, y) {
    let [row, col] = [tile.row, tile.col]
    return (row != this.previousRow || col != this.previousCol) 
           && x > col * (tileW + 1) 
           && x < col * (tileW + 1) + tileW 
           && y > row * (tileH + 1)
           && y < row * (tileH + 1) + tileH
  }

}


