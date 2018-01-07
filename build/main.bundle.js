/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tileH = exports.tileH = 20; // cell height
var tileW = exports.tileW = 20; // cell width
var numberOfRows = exports.numberOfRows = 21;
var numberOfCols = exports.numberOfCols = 45;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var canvas = exports.canvas = document.getElementById('myCanvas');
var ctx = exports.ctx = canvas.getContext('2d');
var createBtn = exports.createBtn = document.getElementById('create');
var findPathBtn = exports.findPathBtn = document.getElementById('pathFinder');
var resetBtn = exports.resetBtn = document.getElementById('reset');
var clearBtn = exports.clearBtn = document.getElementById('clearPath');
var clearWallsBtn = exports.clearWallsBtn = document.getElementById('clearWalls');

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawRectangle = drawRectangle;

var _constants = __webpack_require__(0);

var _domCache = __webpack_require__(1);

var _maze = __webpack_require__(14);

var _maze2 = _interopRequireDefault(_maze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startSquareColor = _maze2.default.startSquareColor;
var finishSquareColor = _maze2.default.finishSquareColor;
var wallSquareColor = _maze2.default.wallSquareColor;
var emptySquareColor = _maze2.default.emptySquareColor;
var pathSquareColor = _maze2.default.pathSquareColor;

_domCache.canvas.width = (_constants.tileW + 1) * _constants.numberOfCols - 1;
_domCache.canvas.height = (_constants.tileH + 1) * _constants.numberOfRows - 1;

function drawRectangle(x, y, state) {
  if (state === 'start') _domCache.ctx.fillStyle = startSquareColor;else if (state === 'finish') _domCache.ctx.fillStyle = finishSquareColor;else if (state === 'wall') _domCache.ctx.fillStyle = wallSquareColor;else if (state === 'path') _domCache.ctx.fillStyle = pathSquareColor;else _domCache.ctx.fillStyle = emptySquareColor;
  _domCache.ctx.beginPath();
  _domCache.ctx.rect(x, y, _constants.tileW, _constants.tileH);
  _domCache.ctx.closePath();
  _domCache.ctx.fill();
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gridClass = __webpack_require__(4);

var _gridClass2 = _interopRequireDefault(_gridClass);

var _mazeClass = __webpack_require__(6);

var _mazeClass2 = _interopRequireDefault(_mazeClass);

var _pathfinderClass = __webpack_require__(7);

var _pathfinderClass2 = _interopRequireDefault(_pathfinderClass);

var _mouseEvents = __webpack_require__(9);

var _mouseEvents2 = _interopRequireDefault(_mouseEvents);

var _domCache = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(14);


var grid = new _gridClass2.default();
grid.init();
var maze = new _mazeClass2.default(grid);
var pathFinder = new _pathfinderClass2.default(grid);
var mouse = new _mouseEvents2.default(grid);

_domCache.createBtn.addEventListener('click', function () {
  return maze.generate();
});
_domCache.findPathBtn.addEventListener('click', function () {
  return pathFinder.exec();
});
_domCache.resetBtn.addEventListener('click', function () {
  return grid.reset();
});
_domCache.clearBtn.addEventListener('click', function () {
  return pathFinder.clearPath();
});
_domCache.clearWallsBtn.addEventListener('click', function () {
  return grid.clearWalls();
});
_domCache.canvas.addEventListener('mousedown', function (event) {
  return mouse.down(event);
});
_domCache.canvas.addEventListener('mouseup', function () {
  return mouse.up();
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

var _tileClass = __webpack_require__(5);

var _tileClass2 = _interopRequireDefault(_tileClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
  function Grid() {
    _classCallCheck(this, Grid);

    this.grid = [];
  }

  _createClass(Grid, [{
    key: 'init',
    value: function init() {
      for (var row = 0; row < _constants.numberOfRows; row++) {
        this.grid[row] = [];
        for (var col = 0; col < _constants.numberOfCols; col++) {
          var x = col * (_constants.tileW + 1); //get x coordinate pixel for canvas draw; add 1 to have a border
          var y = row * (_constants.tileH + 1); // same for y
          this.grid[row][col] = new _tileClass2.default(x, y, 'empty', row, col); // assign Tile object to every matrix cell
          this.grid[row][col].draw(); // draw the tile
        }
      }
      this.setStart();
      this.setFinish();
    }
  }, {
    key: 'reset',
    value: function reset() {
      for (var row = 0; row < _constants.numberOfRows; row++) {
        for (var col = 0; col < _constants.numberOfCols; col++) {
          this.grid[row][col].reset();
        }
      }
      this.setStart();
      this.setFinish();
    }
  }, {
    key: 'setStart',
    value: function setStart() {
      var _getRandomCoords = this.getRandomCoords(),
          _getRandomCoords2 = _slicedToArray(_getRandomCoords, 2),
          row = _getRandomCoords2[0],
          col = _getRandomCoords2[1];

      this.grid[row][col].draw('start');
      this.grid[row][col].state = 'start';
      this.grid[row][col].accumulatedCost = 1;
      this.grid[row][col].available = false; // start node can not be chosen again
    }
  }, {
    key: 'setFinish',
    value: function setFinish() {
      var _getRandomCoords3 = this.getRandomCoords(),
          _getRandomCoords4 = _slicedToArray(_getRandomCoords3, 2),
          row = _getRandomCoords4[0],
          col = _getRandomCoords4[1];

      this.grid[row][col].draw('finish');
      this.grid[row][col].state = 'finish';
    }
  }, {
    key: 'getRandomCoords',
    value: function getRandomCoords() {
      var row = void 0,
          col = void 0;
      row = Math.floor(Math.random() * _constants.numberOfRows);
      col = Math.floor(Math.random() * _constants.numberOfCols);
      while (row % 2 || col % 2 || this.grid[row][col].state === 'start') {
        row = Math.floor(Math.random() * _constants.numberOfRows);
        col = Math.floor(Math.random() * _constants.numberOfCols);
      }
      return [row, col];
    }
  }, {
    key: 'getNeighbors',
    value: function getNeighbors(row, col) {
      var _this = this;

      var coordinates = [[row + 1, col], [row, col + 1], [row - 1, col], [row, col - 1]]; // get all the coordinates around the current tile
      coordinates = coordinates.filter(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            row = _ref2[0],
            col = _ref2[1];

        return row > -1 && row < _constants.numberOfRows && col > -1 && col < _constants.numberOfCols;
      }); //check if coordinates are inside the canvas
      return coordinates.map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            row = _ref4[0],
            col = _ref4[1];

        return _this.grid[row][col];
      }).filter(function (obj) {
        return obj.available && obj.state != 'wall';
      }); // check if tile is available/not a wall
    }
  }, {
    key: 'clearWalls',
    value: function clearWalls() {
      for (var row = 0; row < _constants.numberOfRows; row++) {
        for (var col = 0; col < _constants.numberOfCols; col++) {
          var currentTile = this.grid[row][col];
          if (currentTile.state === 'wall') {
            currentTile.reset();
            currentTile.draw();
          }
        }
      }
    }
  }]);

  return Grid;
}();

exports.default = Grid;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawClass = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = function () {
  function Tile(x, y, state, row, col) {
    _classCallCheck(this, Tile);

    this.x = x; // X coordinate pixelwise
    this.y = y; // Y coordinate pixelwise
    this.state = state;
    this.row = row; //row in the matrix
    this.col = col; //col in the matrix
    this.available = true;
    this.inTheList = false;
    this.initialCost = 0;
    this.accumulatedCost = 0;
    this.totalCost;
    this.parent;
  }

  _createClass(Tile, [{
    key: 'draw',
    value: function draw() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'empty';

      (0, _drawClass.drawRectangle)(this.x, this.y, state);
    }
  }, {
    key: 'reset',
    value: function reset() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'empty';

      this.state = state;
      this.initialCost = 0;
      this.accumulatedCost = 0;
      this.totalCost = undefined;
      this.inTheList = false;
      this.available = true;
      this.parent = undefined;
      this.draw(this.state);
    }
  }]);

  return Tile;
}();

exports.default = Tile;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
This is maze generator class using traditional depth-first-search approach. Walls are as thick as empty spaces. It works as follows: 
1. Fill grid with walls
2. Select random square with even column and row coordinates if it is a wall and make it an empty space. Push it onto stack.
3. Get all the neighbors of the current square. Since walls are as thick as empty spaces, we need to add/subtract 2 to the current matrix indices.
Otherwise we would fill the entire grid with empty spaces.
4. If there are no available neighbors, backtrack and take the last square off the stack.
5. If the stack is empty, we're done.
*/

var Maze = function () {
  function Maze(gridInstance) {
    _classCallCheck(this, Maze);

    this.gridInstance = gridInstance;
    this.grid = gridInstance.grid;
    this.start;
    this.curTile;
    this.randomNeighbor;
    this.tileInBetween;
    this.stack = [];
  }

  _createClass(Maze, [{
    key: 'generate',
    value: function generate() {
      var neighbors = void 0;
      this.fillWithWalls();
      this.selectMazeStart();
      this.stack.push(this.start);
      while (this.stack.length) {
        this.curTile = this.curTile || this.stack.slice(-1)[0];
        neighbors = this.getNeighbors(this.curTile.row, this.curTile.col);
        if (neighbors.length) {
          this.selectRandomNeighbor(neighbors);
          this.handleTileInBetween();
        } else {
          this.curTile = this.stack.pop();
        }
      }
      this.gridInstance.setFinish();
      this.gridInstance.setStart();
    }
  }, {
    key: 'fillWithWalls',
    value: function fillWithWalls() {
      for (var row = 0; row < _constants.numberOfRows; row++) {
        for (var col = 0; col < _constants.numberOfCols; col++) {
          this.grid[row][col].reset('wall');
          this.grid[row][col].visited = false;
        }
      }
    }
  }, {
    key: 'selectMazeStart',
    value: function selectMazeStart() {
      var _gridInstance$getRand = this.gridInstance.getRandomCoords(),
          _gridInstance$getRand2 = _slicedToArray(_gridInstance$getRand, 2),
          row = _gridInstance$getRand2[0],
          col = _gridInstance$getRand2[1];

      this.start = this.grid[row][col];
      this.start.draw();
      this.start.visited = true;
    }
  }, {
    key: 'getNeighbors',
    value: function getNeighbors(row, col) {
      var _this = this;

      var coordinates = [[row + 2, col], [row, col + 2], [row - 2, col], [row, col - 2]];
      return coordinates.filter(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            row = _ref2[0],
            col = _ref2[1];

        return row > -1 && row < _constants.numberOfRows && col > -1 && col < _constants.numberOfCols;
      }) // check if both row and column are within the limits of the grid
      .map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            row = _ref4[0],
            col = _ref4[1];

        return _this.grid[row][col];
      }).filter(function (tile) {
        return !tile.visited;
      }); // check if tile has not been visited
    }
  }, {
    key: 'selectRandomNeighbor',
    value: function selectRandomNeighbor(neighbors) {
      var rnd = void 0;
      rnd = Math.floor(Math.random() * neighbors.length);
      this.randomNeighbor = neighbors[rnd];
      this.randomNeighbor.draw();
      this.randomNeighbor.state = 'empty';
    }

    /* with each step we clear three walls: selected square, it's neighbor, and the square in between. 
    The following function finds which square is the square in between. 
    */

  }, {
    key: 'handleTileInBetween',
    value: function handleTileInBetween() {
      var br = void 0,
          bc = void 0; //indices of the square in between

      br = this.curTile.row < this.randomNeighbor.row ? this.curTile.row + 1 : this.curTile.row > this.randomNeighbor.row ? this.curTile.row - 1 : this.curTile.row;

      bc = this.curTile.col < this.randomNeighbor.col ? this.curTile.col + 1 : this.curTile.col > this.randomNeighbor.col ? this.curTile.col - 1 : this.curTile.col;

      this.tileInBetween = this.grid[br][bc];
      this.tileInBetween.draw();
      this.tileInBetween.state = 'empty';
      this.randomNeighbor.visited = true;
      this.stack.push(this.randomNeighbor);
    }
  }]);

  return Maze;
}();

exports.default = Maze;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

var _astarClass = __webpack_require__(11);

var _astarClass2 = _interopRequireDefault(_astarClass);

var _utilityFunctions = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//PathFinder class finds start and finish nodes, passes them to the A star algorithm class, and, in case of success, displays the path.

var PathFinder = function () {
  function PathFinder(gridInstance) {
    _classCallCheck(this, PathFinder);

    this.gridInstance = gridInstance; //reference to Grid object methods
    this.grid = gridInstance.grid; // the actual matrix of the Grid object
  }

  _createClass(PathFinder, [{
    key: 'exec',
    value: function exec() {
      this.clearPath();
      var start = this.findStart();
      var finish = this.findFinish();
      var astar = new _astarClass2.default(this.gridInstance, start, finish);
      astar.exec();
      if (astar.linkedList) {
        this.displayPath(astar.linkedList);
      }
    }
  }, {
    key: 'findStart',
    value: function findStart() {
      for (var row = 0; row < _constants.numberOfRows; row++) {
        for (var col = 0; col < _constants.numberOfCols; col++) {
          if (this.grid[row][col].state === 'start') {
            return this.grid[row][col];
          }
        }
      }
    }
  }, {
    key: 'findFinish',
    value: function findFinish() {
      for (var row = 0; row < _constants.numberOfRows; row++) {
        for (var col = 0; col < _constants.numberOfCols; col++) {
          if (this.grid[row][col].state === 'finish') {
            return this.grid[row][col];
          }
        }
      }
    }
  }, {
    key: 'displayPath',
    value: function displayPath(linkedList) {
      var counter = 0;
      (0, _utilityFunctions.disableButtons)(); // disable the buttons so the user does not interfere while program displays the path
      linkedList.forEach(function (tile) {
        (function (counter) {
          setTimeout(function () {
            tile.draw('path');
          }, 50 * counter);
        })(counter++);
      });
      var duration = counter * 50; //duration is the time needed to display the path (50ms for each square)
      setTimeout(_utilityFunctions.enableButtons, duration); // renable buttons after the path has been displayed
    }
  }, {
    key: 'clearPath',
    value: function clearPath() {
      for (var row = 0; row < _constants.numberOfRows; row++) {
        for (var col = 0; col < _constants.numberOfCols; col++) {
          var state = this.grid[row][col].state;
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
  }]);

  return PathFinder;
}();

exports.default = PathFinder;

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

var _domCache = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MouseEvents = function () {
  function MouseEvents(gridInstance) {
    var _this = this;

    _classCallCheck(this, MouseEvents);

    this.grid = gridInstance.grid;
    this.mouseMoveWrapper = function (e) {
      return _this.move(e);
    }; // need to wrap the function to be able to remove the event listener
    this.moveSource;
    this.previousRow;
    this.previousCol;
  }

  _createClass(MouseEvents, [{
    key: 'down',
    value: function down(e) {
      e = e || window.event;
      var x = e.pageX - _domCache.canvas.offsetLeft;
      var y = e.pageY - _domCache.canvas.offsetTop;

      _domCache.canvas.addEventListener("mousemove", this.mouseMoveWrapper);

      for (var row = 0; row < _constants.numberOfRows; row++) {
        for (var col = 0; col < _constants.numberOfCols; col++) {
          var currentTile = this.grid[row][col];
          if (this.isEventTarget(currentTile, x, y)) {
            if (currentTile.state === 'start') {
              this.moveSource = 'start';
            } else if (currentTile.state === 'finish') {
              this.moveSource = 'finish';
            } else {
              currentTile.state = currentTile.state === 'empty' ? 'wall' : currentTile.state === 'wall' ? 'empty' : currentTile.state;
              currentTile.draw(currentTile.state);
            }
            this.previousRow = row;
            this.previousCol = col;
          }
        }
      }
    }
  }, {
    key: 'move',
    value: function move(e) {
      e = e || window.event;
      var x = e.pageX - _domCache.canvas.offsetLeft;
      var y = e.pageY - _domCache.canvas.offsetTop;
      for (var row = 0; row < _constants.numberOfRows; row++) {
        for (var col = 0; col < _constants.numberOfCols; col++) {
          var currentTile = this.grid[row][col];
          if (this.isEventTarget(currentTile, x, y)) {
            if (this.moveSource === 'start' || this.moveSource === 'finish') {
              var previousTile = this.grid[this.previousRow][this.previousCol];
              if (currentTile.state === 'empty') {
                currentTile.state = this.moveSource;
                currentTile.draw(this.grid[row][col].state);
                previousTile.state = 'empty';
                previousTile.draw();
              } else {
                return;
              }
            } else {
              currentTile.state = currentTile.state === 'empty' ? 'wall' : currentTile.state === 'wall' ? 'empty' : currentTile.state;
              currentTile.draw(currentTile.state);
            }
            this.previousRow = row;
            this.previousCol = col;
          }
        }
      }
    }
  }, {
    key: 'up',
    value: function up() {
      this.moveSource = null;
      this.previousRow = null;
      this.previousCol = null;
      _domCache.canvas.removeEventListener('mousemove', this.mouseMoveWrapper);
    }
  }, {
    key: 'isEventTarget',
    value: function isEventTarget(tile, x, y) {
      var _ref = [tile.row, tile.col],
          row = _ref[0],
          col = _ref[1];

      return (row != this.previousRow || col != this.previousCol) && x > col * (_constants.tileW + 1) && x < col * (_constants.tileW + 1) + _constants.tileW && y > row * (_constants.tileH + 1) && y < row * (_constants.tileH + 1) + _constants.tileH;
    }
  }]);

  return MouseEvents;
}();

exports.default = MouseEvents;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disableButtons = disableButtons;
exports.enableButtons = enableButtons;
function disableButtons() {
  var buttons = document.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute('disabled', 'true');
  }
}

function enableButtons() {
  var buttons = document.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].removeAttribute('disabled');
  }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//https://en.wikipedia.org/wiki/A*_search_algorithm

var Astar = function () {
  function Astar(grid, start, finish) {
    _classCallCheck(this, Astar);

    this.grid = grid;
    this.start = start;
    this.finish = finish;
    this.openList = [];
    this.pathFound = false;
    this.linkedList = [];
  }

  _createClass(Astar, [{
    key: 'exec',
    value: function exec() {
      var selectedTile = void 0,
          selectedTileIndex = void 0,
          neighbors = void 0;
      this.setStart();
      while (this.openList.length) {
        if (this.pathFound) break;

        var _findTileWithLowestCo = this.findTileWithLowestCost(this.openList);

        var _findTileWithLowestCo2 = _slicedToArray(_findTileWithLowestCo, 2);

        selectedTile = _findTileWithLowestCo2[0];
        selectedTileIndex = _findTileWithLowestCo2[1];

        neighbors = this.grid.getNeighbors(selectedTile.row, selectedTile.col);
        this.updateNeighbors(neighbors, selectedTile);
        this.openList.splice(selectedTileIndex, 1); // remove current tile from the list
        selectedTile.available = false; //it should not be chossen again
      }
      if (!this.pathFound) {
        alert('Path does not exist!');
      }
    }
  }, {
    key: 'setStart',
    value: function setStart() {
      this.start.initialCost = Math.abs(this.finish.row - this.start.row) + Math.abs(this.finish.col - this.start.col); // counting Manhattan distance
      this.start.totalCost = this.start.initialCost;
      this.start.inTheList = true;
      this.openList.push(this.start);
    }
  }, {
    key: 'findTileWithLowestCost',
    value: function findTileWithLowestCost() {
      var lowestCost = void 0,
          selectedTile = void 0,
          selectedTileIndex = void 0;
      lowestCost = this.openList[0].totalCost;
      selectedTile = this.openList[0];
      selectedTileIndex = 0;
      for (var i = 0; i < this.openList.length; i++) {
        if (this.openList[i].totalCost < lowestCost) {
          lowestCost = this.openList[i].totalCost;
          selectedTile = this.openList[i];
          selectedTileIndex = i;
        }
      }
      return [selectedTile, selectedTileIndex];
    }
  }, {
    key: 'updateNeighbors',
    value: function updateNeighbors(neighbors, selectedTile) {
      for (var k = 0; k < neighbors.length; k++) {
        var neighbor = neighbors[k];
        if (neighbor.state === 'finish') {
          this.pathFound = true;
          this.createLinkedList(selectedTile);
          return;
        } else {
          if (neighbor.totalCost === undefined) {
            // if the tile has not yet been visited
            neighbor.parent = selectedTile; //set parent reference to be able to make a linked list later
            neighbor.initialCost = Math.abs(this.finish.col - neighbor.col) + Math.abs(this.finish.row - neighbor.row); //innitial cost - Manhattan distance to the finish
            neighbor.totalCost = selectedTile.accumulatedCost + neighbor.initialCost; // total cost = cost accumulated up to this point + initial cost
            neighbor.accumulatedCost = selectedTile.accumulatedCost + 1;
          } else if (neighbor.totalCost > selectedTile.accumulatedCost + neighbor.initialCost) {
            // if neighbor has been visited and current total cost is bigger than initial cost + accumulated cost
            neighbor.accumulatedCost = selectedTile.accumulatedCost + 1;
            neighbor.totalCost = selectedTile.accumulatedCost + neighbor.initialCost;
          }
          if (!neighbor.inTheList) {
            neighbor.inTheList = true;
            this.openList.push(neighbor);
          }
        }
      }
    }
  }, {
    key: 'createLinkedList',
    value: function createLinkedList(node) {
      while (node.parent) {
        node.state = 'path';
        this.linkedList.unshift(node); //add nodes to linked list in reversed mode
        node = node.parent;
      }
    }
  }]);

  return Astar;
}();

exports.default = Astar;

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected character '#' (1:22)\nYou may need an appropriate loader to handle this file type.\n| $bodyBackgroundColor: #F5F6CE;\r\n| $startSquareColor: #ff8c1a;\r\n| $finishSquareColor: #4d4dff;\r");

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map