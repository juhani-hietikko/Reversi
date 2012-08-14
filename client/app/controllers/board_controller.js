$.Controller.extend("App.Controllers.Board", {
}, {
    init: function(el, options) {
    	this.element.html('//app/views/sections/board.ejs', {});
    	this.moves = 0;
    	this.board = new Board(this);
    },
    
    updateCell: function(rowIndex, colIndex, newCellStatus) {
		var disk = "//app/views/sections/" + newCellStatus + "_disk.ejs";
		var clickedCell = this.findCell(rowIndex, colIndex);
		clickedCell.place(disk);
	},
    
    findCell: function(rowIndexOfCell, colIndexOfCell) {
		var buildCell = function(cellPrototype, rowIndex, colIndex) {
	    	cellPrototype.place = function(disk) {
				$(this).html(disk, {});
			};
			return cellPrototype;
	    };
    	
    	var foundCell = null;
		$('table tr').each(function(rowIndex, row) {
			if (rowIndex == rowIndexOfCell) {
				$(row).find('td').each(function(colIndex, cell) {
					if (colIndex == colIndexOfCell) {
						foundCell = buildCell(cell, rowIndex, colIndex);
					}
				});
			}
		});
		return foundCell;
	},
    
	placeDisk: function(rowIndex, colIndex, player) {
		return this.board.placeDisk(rowIndex, colIndex, player);
	},

	click: function(el, ev) {
		var clickedRowIndex = ev.target.parentNode.parentNode.rowIndex;
		var clickedColIndex = ev.target.parentNode.cellIndex;
		
		var moveSuccessful = false;
		if (this.moves % 2 == 0)
			moveSuccessful = this.placeDisk(clickedRowIndex, clickedColIndex, 'black');	
		else
			moveSuccessful = this.placeDisk(clickedRowIndex, clickedColIndex, 'white');

		if (moveSuccessful) {
			this.moves++;
			this.publish('moveDoneByPlayer');
		}
	}
});