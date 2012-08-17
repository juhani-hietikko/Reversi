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
	
	test("intial score is 2-2", function() {
		S(document).ready(function() {
			equal(S('#score').text(), "Black-White 2-2");
		});
	});

	test("after placing a black disk to 3,2 score is 4-1", function() {
		S(document).ready(function() {
			clickCell(3, 2).andThen(function() {
				equal(S('#score').text(), "Black-White 4-1");
			});
		});
	});

	test("after placing a black disk to 3,2 and a white disk to 2,2 score is 3-3", function() {
		S(document).ready(function() {
			clickCell(3, 2).andThen(function() {
				clickCell(2, 2).andThen(function() {
					equal(S('#score').text(), "Black-White 3-3");
				});
			});
		});
	});
});
