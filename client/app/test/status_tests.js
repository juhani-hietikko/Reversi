steal("funcunit").then(function() {
	
	module("status tests",{
		setup: function() {
			S.open('http://localhost:8080/app/index.html');
		},
	});
	
	test("displays title", function() {
		S(document).ready(function() {
			equal(S('h1').text(), "Reversi");
		});
	});
	
	test("says black is first to move", function() {
		S(document).ready(function() {
			equal(S('#whoseMove').text(), "Black to move.");
		});
	});
});
