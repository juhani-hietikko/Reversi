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
			cellToClick = findCell(3, 2);
			var img = S(cellToClick).find("img");
			S(img).click();
			S.wait(100, function() {
				equal(S('#whoseMove').text(), "White to move.");
			});
		});
	});
});
