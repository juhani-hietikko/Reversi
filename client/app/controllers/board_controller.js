$.Controller.extend("App.Controllers.Board", {
}, {
    init: function(el, options) {
    	this.element.html('//app/views/sections/board.ejs', {});
    },
    
    findCell: function(rowIndexOfCell, colIndexOfCell) {
		var foundCell = null;
		$('table tr').each(function(rowIndex, row) {
			if (rowIndex == rowIndexOfCell) {
				$(row).find('td').each(function(colIndex, cell) {
					if (colIndex == colIndexOfCell) {
						foundCell = cell;
					}
				});
			}
		});
		return foundCell;
	},

	click: function(el, ev) {
		var clickedRowIndex = ev.target.parentNode.parentNode.rowIndex;
		var clickedColIndex = ev.target.parentNode.cellIndex;
		var clickedCell = this.findCell(clickedRowIndex, clickedColIndex);
		$(clickedCell).html('//app/views/sections/black_disk.ejs', {});
	}
});