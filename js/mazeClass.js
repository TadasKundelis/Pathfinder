import {tileH} from './constants'
import {tileW} from './constants'
import {numberOfRows} from './constants'
import {numberOfCols} from './constants'

/*
This is maze generator class using traditional depth-first-search approach. Walls are as thick as empty spaces. It works as follows: 
1. Fill grid with walls
2. Select random square with even column and row coordinates if it is a wall and make it an empty space. Push it onto stack.
3. Get all the neighbors of the current square. Since walls are as thick as empty spaces, we need to add/subtract 2 to the current matrix indices.
Otherwise we would fill the entire grid with empty spaces.
4. If there are no available neighbors, backtrack and take the last square off the stack.
5. If the stack is empty, we're done.
*/

export default class Maze {
  constructor(gridInstance){
    this.gridInstance = gridInstance;
    this.grid = gridInstance.grid;
    this.start;
    this.curTile;
    this.randomNeighbor;
    this.tileInBetween;
    this.stack = [];
  }

  generate() {
    let neighbors;
    this.fillWithWalls();
    this.selectMazeStart()
    this.stack.push(this.start);
    while (this.stack.length) {
      this.curTile = this.curTile || this.stack.slice(-1)[0]
      neighbors = this.getNeighbors(this.curTile.row, this.curTile.col)
      if (neighbors.length) {
        this.selectRandomNeighbor(neighbors);
        this.handleTileInBetween();
      } else {
        this.curTile = this.stack.pop()
      }
    }
    this.gridInstance.setFinish()  
    this.gridInstance.setStart()
  }

  fillWithWalls() {
    for (let row = 0; row < numberOfRows; row++) {
      for (let col = 0; col < numberOfCols; col++) {
        this.grid[row][col].reset('wall');
        this.grid[row][col].visited = false
      }
    }
  }

  selectMazeStart() {
    let [row, col] = this.gridInstance.getRandomCoords();
    this.start = this.grid[row][col]
    this.start.draw()
    this.start.visited = true;
  }

  getNeighbors(row, col){
    let coordinates = [[row + 2, col], [row, col + 2], [row - 2, col], [row, col - 2]];
    return coordinates
             .filter(([row, col]) => row > -1 && row < numberOfRows && col > -1 && col < numberOfCols) // check if both row and column are within the limits of the grid
             .map(([row, col]) => this.grid[row][col]).filter(tile => !tile.visited) // check if tile has not been visited
  }

  selectRandomNeighbor(neighbors) {
    let rnd;
    rnd = Math.floor(Math.random() * neighbors.length)
    this.randomNeighbor = neighbors[rnd]
    this.randomNeighbor.draw()
    this.randomNeighbor.state = 'empty'; 
  }
  
  /* with each step we clear three walls: selected square, it's neighbor, and the square in between. 
  The following function finds which square is the square in between. 
  */
  handleTileInBetween(){
    let br, bc;  //indices of the square in between
    
    br = this.curTile.row < this.randomNeighbor.row ? this.curTile.row + 1 : 
         this.curTile.row > this.randomNeighbor.row ? this.curTile.row - 1 :
         this.curTile.row
    
    bc = this.curTile.col < this.randomNeighbor.col ? this.curTile.col + 1 : 
         this.curTile.col > this.randomNeighbor.col ? this.curTile.col - 1 :
         this.curTile.col
    
    this.tileInBetween = this.grid[br][bc];
    this.tileInBetween.draw();
    this.tileInBetween.state = 'empty';
    this.randomNeighbor.visited = true;
    this.stack.push(this.randomNeighbor)
  }

}

