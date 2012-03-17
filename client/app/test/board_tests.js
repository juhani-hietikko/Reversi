steal("funcunit").then(function() {
	
	var WHITE_DISC = "<img src=\"img/white.png\">";
	var BLACK_DISC = "<img src=\"img/black.png\">";
	var EMPTY_SQUARE = "<img src=\"img/empty.png\">";

	var findCell = function(rowIndexOfCell, colIndexOfCell) {
		var foundCell = null;
		S('table tr').each(function(rowIndex, row) {
			if (rowIndex == rowIndexOfCell) {
				S(row).find('td').each(function(colIndex, cell) {
					if (colIndex == colIndexOfCell) {
						foundCell = cell;
					}
				});
			}
		});
		return foundCell;
	};
	
	module("board tests",{
		setup: function() {
			S.open('http://localhost:8080/app/index.html');
		},
	});
	
	test("displays a 8x8 board", function() {
		S(document).ready(function() {
			equal(S('table').length, 1);
			equal(S('table').find('tr').length, 8);
			equal(S('table').find('td').length, 64);
		});
	});
	
	
	test("sets up the initial disc pattern on the board", function() {
		S(document).ready(function() {
			S('table tr').each(function(rowIndex, row) {
				S(row).find('td').each(function(colIndex, cell) {
					if (rowIndex == 3 && colIndex == 3) {
						equal(cell.innerHTML, WHITE_DISC);		
					} else if (rowIndex == 3 && colIndex == 4) {
						equal(cell.innerHTML, BLACK_DISC);		
					} else if (rowIndex == 4 && colIndex == 3) {
						equal(cell.innerHTML, BLACK_DISC);		
					} else if (rowIndex == 4 && colIndex == 4) {
						equal(cell.innerHTML, WHITE_DISC);
					} else {
						equal(cell.innerHTML, EMPTY_SQUARE);
					}
				});
			});
		});
	});
		
	test("clicking a cell places a black disk", function() {
		S(document).ready(function() {
			cellToClick = findCell(7, 7);
			var img = S(cellToClick).find("img");
			S(img).click();
			S.wait(100, function() {
				equal(cellToClick.innerHTML, BLACK_DISC);	
			});
		});
	});
});
