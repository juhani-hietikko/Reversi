function Board(viewUpdater) {
	const EMPTY = 'empty';
	const BLACK = 'black';
	const WHITE = 'white';
	const LEGAL_MOVE = true;
	const ILLEGAL_MOVE = false;
	
	var myCells = new Array();
	this.cells = myCells;
	for (var i = 0; i < 8; i++) {
		var row = new Array();
		this.cells[i] = row;
		for (var j = 0; j < 8; j++) {
			if ((i == 3 && j == 3) || (i == 4 && j == 4)) {
				row[j] = WHITE;
			} else if ((i == 3 && j == 4) || (i == 4 && j == 3)) {
				row[j] = BLACK;
			} else {
				row[j] = EMPTY;
			};
		};
	}
	
	this.placeDisk = function(rowIndex, colIndex, player) {
		var updateCell = function(rowIndex, colIndex, color) {
			myCells[rowIndex][colIndex] = color;
			viewUpdater.updateCell(rowIndex, colIndex, color);
		};
		if (myCells[rowIndex][colIndex] != EMPTY) {
			return ILLEGAL_MOVE;
		}
		
		var findCellsToFlip = function(enclosingColor, edgeX, edgeY, xDirection, yDirection) {
			var cellsToFlip = new Array();
			var x = edgeX + xDirection; 
			var y = edgeY + yDirection;
			for (var i = x, j = y; i < 8 && i >= 0 && j < 8 && j >= 0; i += xDirection, j += yDirection) {
				var currentColor = myCells[i][j];
				if (currentColor != EMPTY && currentColor != enclosingColor) {
					cellsToFlip.push({ newColor: enclosingColor, x: i, y: j });
				} else if (currentColor == enclosingColor) {
					return cellsToFlip;
				} else {
					return new Array();
				};
			}
			return new Array();
		};
		var flip = function(cellsToFlip) {
			for (var i = 0; i < cellsToFlip.length; i++) {
				var flip = cellsToFlip[i];
				updateCell(flip.x, flip.y, flip.newColor);
			};
		};
		cellsToFlip = new Array();
		for (var xDir = -1; xDir <= 1; xDir++) {
			for (var yDir = -1; yDir <= 1; yDir++) {
				if (xDir != 0 || yDir != 0) {
					cellsToFlip = cellsToFlip.concat(findCellsToFlip(player, rowIndex, colIndex, xDir, yDir));
				};
			};
		}
		if (cellsToFlip.length > 0) {
			flip(cellsToFlip);
			updateCell(rowIndex, colIndex, player);
			return LEGAL_MOVE;
		} else {
			return ILLEGAL_MOVE;
		};
	};
	
	this.countDisks = function(color) {
		var count = 0;
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				if (this.cells[i][j] == color) {
					count++;
				};
			};
		}
		return count;
	}
	
	this.blackDisks = function() {
		return this.countDisks(BLACK);
	};
	
	this.whiteDisks = function() {
		return this.countDisks(WHITE);
	};
	
	this.findCellsToFlip = function(enclosingColor, edgeX, edgeY, xDirection, yDirection) {
		var cellsToFlip = new Array();
		var x = edgeX + xDirection; 
		var y = edgeY + yDirection;
		for (var i = x, j = y; i < 8 && i >= 0 && j < 8 && j >= 0; i += xDirection, j += yDirection) {
			var currentColor = myCells[i][j];
			if (currentColor != EMPTY && currentColor != enclosingColor) {
				cellsToFlip.push({ newColor: enclosingColor, x: i, y: j });
			} else if (currentColor == enclosingColor) {
				return cellsToFlip;
			} else {
				return new Array();
			};
		}
		return new Array();
	};
	
	this.findAllCellsToFlip = function(enclosingColor, rowIndex, colIndex) {
		var cellsToFlip = new Array();
		for (var xDir = -1; xDir <= 1; xDir++) {
			for (var yDir = -1; yDir <= 1; yDir++) {
				if (xDir != 0 || yDir != 0) {
					cellsToFlip = cellsToFlip.concat(this.findCellsToFlip(enclosingColor, rowIndex, colIndex, xDir, yDir));
				};
			};
		}
		return cellsToFlip;
	}
	
	this.hasLegalMoves = function(player) {
		var findCellsToFlip = function(enclosingColor, edgeX, edgeY, xDirection, yDirection) {
			var cellsToFlip = new Array();
			var x = edgeX + xDirection; 
			var y = edgeY + yDirection;
			for (var i = x, j = y; i < 8 && i >= 0 && j < 8 && j >= 0; i += xDirection, j += yDirection) {
				var currentColor = myCells[i][j];
				if (currentColor != EMPTY && currentColor != enclosingColor) {
					cellsToFlip.push({ newColor: enclosingColor, x: i, y: j });
				} else if (currentColor == enclosingColor) {
					return cellsToFlip;
				} else {
					return new Array();
				};
			}
			return new Array();
		};
		
		var findAllCellsToFlip = function(enclosingColor, rowIndex, colIndex) {
			var cellsToFlip = new Array();
			for (var xDir = -1; xDir <= 1; xDir++) {
				for (var yDir = -1; yDir <= 1; yDir++) {
					if (xDir != 0 || yDir != 0) {
						cellsToFlip = cellsToFlip.concat(findCellsToFlip(enclosingColor, rowIndex, colIndex, xDir, yDir));
					};
				};
			}
			return cellsToFlip;
		}
		
		for (var i = 0; i < 8; i++) {
			for (var j = 0; j < 8; j++) {
				if (this.cells[i][j] == EMPTY) {
					var c = findAllCellsToFlip(player, i, j);
					if (c.length > 0) {
						return true;
					};
				};
			};
		}
		return false;
	};
};
