$.Controller.extend("App.Controllers.Status", {
}, {
    init: function(el, options) {
    	this.displayStatus = function(blackDisks, whiteDisks) {
    		if (this.gameOver) 
    			$('#whoseMove').text('Game over.');
    		else
    			$('#whoseMove').text(this.whoseMove + ' to move.');
    		$('#score').text('Black-White ' + this.blackDisks + '-' + this.whiteDisks);
    	};
    	this.gameOver = false;
    	this.whoseMove = 'Black';
    	this.blackDisks = 2;
    	this.whiteDisks = 2;
    	
    	this.element.html('//app/views/sections/status.ejs', {});
    	
    	var self = this;
    	$(document).ready(function() {
    		self.displayStatus();
    	});
    },
    
    'moveDoneByPlayer subscribe': function(called, board) {
    	if (this.whoseMove == 'Black')
    		this.whoseMove = 'White';
    	else
    		this.whoseMove = 'Black';
    	
    	this.blackDisks = board.blackDisks();
    	this.whiteDisks = board.whiteDisks();
    	
    	if (!board.hasLegalMoves(this.whoseMove.toLowerCase())) {
    		this.gameOver = true;
    	}
    	
    	this.displayStatus();
    }
});