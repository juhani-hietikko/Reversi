$.Controller.extend("App.Controllers.Status", {
}, {
    init: function(el, options) {
    	this.displayStatus = function(blackDisks, whiteDisks) {
    		$('#whoseMove').text(this.whoseMove + ' to move.');
    		$('#score').text('Black-White ' + this.blackDisks + '-' + this.whiteDisks);
    	};
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
    	
    	this.displayStatus();
    }
});