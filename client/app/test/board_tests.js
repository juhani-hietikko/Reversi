steal("funcunit").then(function() {

	module("example",{
		setup: function() {
			S.open('http://localhost:8080/app/index.html');
		}
	});
	
	test("says hello",function() {
		S('p').visible(function() {
			equal( S('p').text(), "Hello, World!");
		});
	});
});
