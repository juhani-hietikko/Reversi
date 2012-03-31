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

var clickCell = function(rowIndexOfCell, colIndexOfCell) {
	cellToClick = findCell(rowIndexOfCell, colIndexOfCell);
	var img = S(cellToClick).find("img");
	S(img).click();
	return {
		andThen : function(then) {
			S.wait(100, function() {
				then(cellToClick);
			});
		}
	};
};