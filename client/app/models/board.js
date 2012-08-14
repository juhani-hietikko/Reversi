

function Board(viewUpdater) {
	var myCells = new Array();
	this.cells = myCells;
	for (var i = 0; i < 8; i++) {
		var row = new Array();
		this.cells[i] = row;
		for (var j = 0; j < 8; j++) {
			if ((i == 3 && j == 3) || (i == 4 && j == 4)) {
				row[j] = new Cell('white');
			} else if ((i == 3 && j == 4) || (i == 4 && j == 3)) {
				row[j] = new Cell('black');
			} else {
				row[j] = new Cell('empty');
			}
		}
	}
	
	this.placeDisk = function(rowIndex, colIndex, player) {
		myCells[rowIndex][colIndex] = new Cell(player);
		viewUpdater.updateCell(rowIndex, colIndex, player);
		
		findCellsToFlip = function(enclosingColor, x, y, xDirection, yDirection) {
			var cellsToFlip = new Array();
			x += xDirection; 
			y += yDirection;
			for (var i = x, j = y; i < 8 && i >= 0 && j < 8 && j >= 0; i += xDirection, j += yDirection) {
				var currentColor = myCells[i][j].getColor();
				if (currentColor != 'empty' && currentColor != enclosingColor) {
					cellsToFlip.push({ color: enclosingColor, x: i, y: j });
				} else if (currentColor == enclosingColor) {
					return cellsToFlip;
				} else {
					return new Array();
				}
			}
			return new Array();
		};
		flip = function(cellsToFlip) {
			for (var i = 0; i < cellsToFlip.length; i++) {
				myCells[cellsToFlip[i].x][cellsToFlip[i].y] = new Cell(cellsToFlip[i].color);
				viewUpdater.updateCell(cellsToFlip[i].x, cellsToFlip[i].y, cellsToFlip[i].color);
			}
		};
		flip(findCellsToFlip(player, rowIndex, colIndex, 1, 0));
		flip(findCellsToFlip(player, rowIndex, colIndex, -1, 0));
		flip(findCellsToFlip(player, rowIndex, colIndex, 0, 1));
		flip(findCellsToFlip(player, rowIndex, colIndex, 0, -1));
		flip(findCellsToFlip(player, rowIndex, colIndex, 1, 1));
		flip(findCellsToFlip(player, rowIndex, colIndex, 1, -1));
		flip(findCellsToFlip(player, rowIndex, colIndex, -1, 1));
		flip(findCellsToFlip(player, rowIndex, colIndex, -1, -1));
//		viewUpdater.updateCell(3, 3, player);
	};
};
