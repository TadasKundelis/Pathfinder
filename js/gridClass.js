import {tileH} from './constants'
import {tileW} from './constants'
import {numberOfRows} from './constants'
import {numberOfCols} from './constants'
import Tile from './tileClass'

export default class Grid {
  constructor() {
    this.grid = []
  }
  
  init() {
    for (let row = 0; row < numberOfRows; row++) {
      this.grid[row] = [];
      for (let col = 0; col < numberOfCols; col++) {
        let x = col * (tileW + 1) //get x coordinate pixel for canvas draw; add 1px to have a border
        let y = row * (tileH + 1) // same for y
        this.grid[row][col] = new Tile (x, y, 'empty', row, col) // assign Tile object to every matrix cell
        this.grid[row][col].draw() // draw the tile
      }
    }
    this.setStart();
    this.setFinish();
  }

  reset() {
    for (let row = 0; row < numberOfRows; row++) {
      for (let col = 0; col < numberOfCols; col++) {
        this.grid[row][col].reset()
      }
    }
    this.setStart();
    this.setFinish();	
  }

  setStart() {
    let [row, col] = this.getRandomCoords()
    this.grid[row][col].draw('start')
    this.grid[row][col].state = 'start'
    this.grid[row][col].accumulatedCost = 1; 
    this.grid[row][col].available = false; // start node can not be chosen again
  }

  setFinish() {
    let [row, col] = this.getRandomCoords();
    this.grid[row][col].draw('finish')
    this.grid[row][col].state = 'finish'
  }

  getRandomCoords(){
    let row, col;
    row = Math.floor(Math.random() * numberOfRows)
    col = Math.floor(Math.random() * numberOfCols)
    while (row % 2 || col % 2 || this.grid[row][col].state === 'start') {
      row = Math.floor(Math.random() * numberOfRows)
      col = Math.floor(Math.random() * numberOfCols)
    }
    return [row, col]
  }

  getNeighbors(row, col) {
    let coordinates = [[row + 1, col], [row, col + 1], [row - 1, col], [row, col - 1]]; // get all the coordinates around the current tile
    coordinates = coordinates.filter(([row, col]) => row > -1 && row < numberOfRows && col > -1 && col < numberOfCols) //check if coordinates are inside the canvas
    return coordinates.map(([row, col]) => this.grid[row][col]).filter(obj => obj.available && obj.state != 'wall') // check if tile is available/not a wall
  }

  clearWalls() {
    for (let row = 0; row < numberOfRows; row++) {
      for (let col = 0; col < numberOfCols; col++) {
        let currentTile = this.grid[row][col];
        if (currentTile.state === 'wall') {
          currentTile.reset();
        }
      }
    }
  }
}

