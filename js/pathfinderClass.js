import {tileH} from './constants'
import {tileW} from './constants'
import {numberOfRows} from './constants'
import {numberOfCols} from './constants'
import Astar from './astarClass'
import {enableButtons} from './utilityFunctions'
import {disableButtons} from './utilityFunctions'

//PathFinder class finds start and finish nodes, passes them to the A star algorithm class, and, in case of success, displays the path.

export default class PathFinder{
  constructor(gridInstance){
    this.gridInstance = gridInstance; //reference to Grid object methods
    this.grid = gridInstance.grid; // the actual matrix of the Grid object
  }

  exec(){
    this.clearPath();  
    let start = this.findStart()
    let finish = this.findFinish()
    let astar = new Astar(this.gridInstance, start, finish)
    astar.exec();
    if (astar.linkedList) {
      this.displayPath(astar.linkedList)
    }
  }

  findStart(){
    for (let row  = 0; row < numberOfRows; row++) {
      for (let col = 0; col < numberOfCols; col++) {
        if (this.grid[row][col].state === 'start') {
          return this.grid[row][col]
        }
      }
    }
  }

  findFinish(){
    for (let row  = 0; row < numberOfRows; row++) {
      for (let col = 0; col < numberOfCols; col++) {
        if (this.grid[row][col].state === 'finish') {
          return this.grid[row][col]
        }
      }
    }
  }
  
  displayPath(linkedList) {
    var counter = 0;
    disableButtons() // disable the buttons so the user does not interfere while program displays the path
    linkedList.forEach(tile => {
      (function(counter) {
        setTimeout(function() {
          tile.draw('path')
        }, 50 * counter)
      })(counter++)
    })
    let duration = counter * 50 //duration is the time needed to display the path (50ms for each square)
    setTimeout(enableButtons, duration) // renable buttons after the path has been displayed
  }

  clearPath(){
    for (let row = 0; row < numberOfRows; row++) {
      for (let col = 0; col  < numberOfCols; col++) {
        let state = this.grid[row][col].state;
        if (state === 'path' || state === 'empty' || state === 'finish') {
          if (state === 'finish') {
            this.grid[row][col].reset('finish');
          } else {
            this.grid[row][col].reset();
          }
        }
      }
    }  
  }

}



  





 
