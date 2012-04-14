$.Controller.extend("App.Controllers.Board", {
}, {
    init: function(el, options) {
    	this.element.html('//app/views/sections/board.ejs', {});
    	this.moves = 0;
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
		
		if (this.moves % 2 == 0)
			var disk = '//app/views/sections/black_disk.ejs';	
		else
			var disk = '//app/views/sections/white_disk.ejs';
		this.moves++;
		
		$(clickedCell).html(disk, {});
		var temp = this.findCell(3, 3);
		$(temp).html(disk, {});
		
		this.publish('moveDoneByPlayer');
	}
});