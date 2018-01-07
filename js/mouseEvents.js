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
          if (currentTile.state === 'start') {
            this.moveSource = 'start';
          } else if (currentTile.state === 'finish') {
            this.moveSource = 'finish';
          } else {
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
          if (this.moveSource === 'start' || this.moveSource === 'finish') {
            let previousTile = this.grid[this.previousRow][this.previousCol];
            if (currentTile.state === 'empty') {
              currentTile.state = this.moveSource
              currentTile.draw(this.grid[row][col].state)
              previousTile.state = 'empty';
              previousTile.draw()
            } else {
              return
            }
          } else { 
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


