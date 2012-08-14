steal("funcunit", "./board_utils.js").then(function() {
	
	var WHITE_DISC = "<img src=\"img/white.png\">";
	var BLACK_DISC = "<img src=\"img/black.png\">";
	var EMPTY_SQUARE = "<img src=\"img/empty.png\">";
	
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
			clickCell(3, 2).andThen(function(clickedCell) {
				equal(clickedCell.innerHTML, BLACK_DISC);
			});
		});
	});
	
	test("clicking a cell after the initial move places a white disk", function() {
		S(document).ready(function() {
			clickCell(3, 2).andThen(function() {
				clickCell(4, 2).andThen(function(clickedCell) {
					equal(clickedCell.innerHTML, WHITE_DISC);
				});
			});
		});
	});
	
	test("clicking a cell third time places a black disk", function() {
		S(document).ready(function() {
			clickCell(3, 2).andThen(function() {
				clickCell(4, 2).andThen(function() {
					clickCell(5, 2).andThen(function(clickedCell) {
						equal(clickedCell.innerHTML, BLACK_DISC);
					});
				});
			});
		});
	});
	
	test("placing a black disk to 3,2 flips the white disk on 3,3", function() {
		S(document).ready(function() {
			clickCell(3, 2).andThen(function() {
				equal(findCell(3, 3).innerHTML, BLACK_DISC);
			});
		});
	});
	
	test("move sequence black:3,2 then white:2,2 flips the black disk on 3,3", function() {
		S(document).ready(function() {
			clickCell(3, 2).andThen(function() {
				clickCell(2, 2).andThen(function() {
					equal(findCell(3, 3).innerHTML, WHITE_DISC);
				});
			});
		});
	});
	
	test("move sequence black:3,2 then white:2,2 then black:2,1 flips the white disk on 2,2", function() {
		S(document).ready(function() {
			clickCell(3, 2).andThen(function() {
				clickCell(2, 2).andThen(function() {
					clickCell(1, 2).andThen(function() {
						equal(findCell(2, 2).innerHTML, BLACK_DISC);
					});
				});
			});
		});
	});
	
	test("trying to place a disk into a reserved position leaves the reserved cell as it is", function() {
		S(document).ready(function() {
			clickCell(3, 3).andThen(function() {
				equal(findCell(3, 3).innerHTML, WHITE_DISC);
			});
		});
	});
	
	test("trying to place a disk into an illegal empty position leaves the cell empty", function() {
		S(document).ready(function() {
			clickCell(3, 5).andThen(function() {
				equal(findCell(3, 5).innerHTML, EMPTY_SQUARE);
			});
		});
	});
});
