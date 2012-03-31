$.Controller.extend("App.Controllers.Status", {
}, {
    init: function(el, options) {
    	this.displayStatus = function() {
    		$('#whoseMove').text(this.whoseMove + ' to move.');
    	};
    	this.whoseMove = 'Black';
    	this.element.html('//app/views/sections/status.ejs', {});
    	
    	var self = this;
    	$(document).ready(function() {
    		self.displayStatus();
    	});
    },
    
    'moveDoneByPlayer subscribe': function(call, ignored) {
    	if (this.whoseMove == 'Black')
    		this.whoseMove = 'White';
    	else
    		this.whoseMove = 'Black';
    	this.displayStatus();
    }
});