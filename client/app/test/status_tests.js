steal("funcunit", "./board_utils.js").then(function() {
	
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
	
	test("after first move says white is to move", function() {
		S(document).ready(function() {
			clickCell(3, 2).andThen(function(clickedCell) {
				equal(S('#whoseMove').text(), "White to move.");
			});
		});
	});
	
	test("after second move says black is to move", function() {
		S(document).ready(function() {
			clickCell(3, 2).andThen(function(ignored) {
				clickCell(2, 2).andThen(function(clickedCell) {
					equal(S('#whoseMove').text(), "Black to move.");
				});
			});
		});
	});
	
	test("after an illegal initial move attempt says black is to move", function() {
		S(document).ready(function() {
			clickCell(3, 3).andThen(function(clickedCell) {
				equal(S('#whoseMove').text(), "Black to move.");
			});
		});
	});
});
