//https://en.wikipedia.org/wiki/A*_search_algorithm

export default class Astar{
  constructor(grid, start, finish){
    this.grid = grid;
    this.start = start;
    this.finish = finish;
    this.openList = [];
    this.pathFound = false;
    this.linkedList = []
  }

  exec(){
    let selectedTile, selectedTileIndex, neighbors;
    this.setStart();
    while (this.openList.length) {
      if (this.pathFound) break
      [selectedTile, selectedTileIndex] = this.findTileWithLowestCost(this.openList)  
      neighbors = this.grid.getNeighbors(selectedTile.row, selectedTile.col)
      this.updateNeighbors(neighbors, selectedTile)
      this.openList.splice(selectedTileIndex, 1); // remove current tile from the list
      selectedTile.available = false; //it should not be chossen again
    }
    if (!this.pathFound) {
      alert('Path does not exist!')
    }  
  }


  setStart(){
    this.start.initialCost = Math.abs(this.finish.row - this.start.row) + Math.abs(this.finish.col - this.start.col) // counting Manhattan distance
    this.start.totalCost = this.start.initialCost;
    this.start.inTheList = true;
    this.openList.push(this.start)
  }
    
  findTileWithLowestCost() {
    let lowestCost, selectedTile, selectedTileIndex;
    lowestCost = this.openList[0].totalCost
    selectedTile = this.openList[0];
    selectedTileIndex = 0;
    for (let i = 0; i < this.openList.length; i++) {
      if (this.openList[i].totalCost < lowestCost) {
        lowestCost = this.openList[i].totalCost
        selectedTile = this.openList[i];
        selectedTileIndex = i;
      }
    }
    return [selectedTile, selectedTileIndex]
  }

  updateNeighbors(neighbors, selectedTile){
    for (let k = 0; k < neighbors.length; k++) {
      let neighbor = neighbors[k]
      if (neighbor.state === 'finish') {
      	this.pathFound = true;
        this.createLinkedList(selectedTile)
        return
      } else {
        if (neighbor.totalCost === undefined) { // if the tile has not yet been visited
          neighbor.parent = selectedTile; //set parent reference to be able to make a linked list later
          neighbor.initialCost = Math.abs(this.finish.col - neighbor.col) + Math.abs(this.finish.row - neighbor.row) //innitial cost - Manhattan distance to the finish
          neighbor.totalCost = selectedTile.accumulatedCost + neighbor.initialCost; // total cost = cost accumulated up to this point + initial cost
          neighbor.accumulatedCost = selectedTile.accumulatedCost + 1 
        } else if (neighbor.totalCost > selectedTile.accumulatedCost + neighbor.initialCost) { // if neighbor has been visited and current total cost is bigger than initial cost + accumulated cost
          neighbor.accumulatedCost = selectedTile.accumulatedCost + 1;
          neighbor.totalCost = selectedTile.accumulatedCost + neighbor.initialCost;
        }
        if (!neighbor.inTheList) {
          neighbor.inTheList = true
          this.openList.push(neighbor) 
        }
      }
    }
  }

  createLinkedList(node){
    while(node.parent) {
      node.state = 'path';
      this.linkedList.unshift(node) //add nodes to linked list in reversed mode
      node = node.parent;
    }
  }

}

 


    
    
    
   


