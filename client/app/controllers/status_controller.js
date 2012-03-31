$.Controller.extend("App.Controllers.Status", {
}, {
    init: function(el, options) {
    	this.element.html('//app/views/sections/status.ejs', {});
    },
    
    'moveDoneByPlayer subscribe': function(call, ignored) {
    	$('#whoseMove').text('White to move.');
    }
});