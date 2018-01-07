require('../css/maze.scss')
import Grid from './gridClass'
import Maze from './mazeClass'
import PathFinder from './pathfinderClass'
import MouseEvents from './mouseEvents'
import {createBtn} from './domCache'
import {findPathBtn} from './domCache'
import {resetBtn} from './domCache'
import {clearBtn} from './domCache'
import {clearWallsBtn} from './domCache'
import {canvas} from './domCache'

const grid = new Grid();
grid.init();
const maze = new Maze(grid);
const pathFinder = new PathFinder(grid);
const mouse = new MouseEvents(grid)


createBtn.addEventListener('click', () => maze.generate())
findPathBtn.addEventListener('click', () => pathFinder.exec())
resetBtn.addEventListener('click', () => grid.reset())
clearBtn.addEventListener('click', () => pathFinder.clearPath())
clearWallsBtn.addEventListener('click', () => grid.clearWalls())
canvas.addEventListener('mousedown', (event) => mouse.down(event))
canvas.addEventListener('mouseup', () => mouse.up())



