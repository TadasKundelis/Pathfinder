import {tileH} from './constants'
import {tileW} from './constants'
import {numberOfRows} from './constants'
import {numberOfCols} from './constants'
import {canvas} from './domCache'
import {ctx} from './domCache'
import styles from '../css/maze.scss'

const startSquareColor = styles.startSquareColor;
const finishSquareColor = styles.finishSquareColor;
const wallSquareColor = styles.wallSquareColor;
const emptySquareColor = styles.emptySquareColor;
const pathSquareColor = styles.pathSquareColor;


canvas.width = (tileW + 1) * numberOfCols - 1
canvas.height = (tileH + 1) * numberOfRows - 1

export function drawRectangle(x, y, state){
  if (state === 'start') ctx.fillStyle = startSquareColor;
  else if (state === 'finish') ctx.fillStyle = finishSquareColor;
  else if (state === 'wall') ctx.fillStyle = wallSquareColor;
  else if (state === 'path') ctx.fillStyle = pathSquareColor;
  else ctx.fillStyle = emptySquareColor;
  ctx.beginPath();
  ctx.rect(x, y, tileW, tileH);
  ctx.closePath();
  ctx.fill();
}