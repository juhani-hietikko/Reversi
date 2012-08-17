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
	
	test("when no leagal moves left says game is over", function() {
		S(document).ready(function() {
			var moves = new Array({x:5,y:4},{x:3,y:5},{x:2,y:4},{x:5,y:5},
					{x:4,y:6},{x:5,y:3},{x:6,y:4},{x:4,y:5},{x:4,y:2});
			doMoves(moves).andThen(function() {
				equal(S('#whoseMove').text(), "Game over.");
			});
		});
	});
});
