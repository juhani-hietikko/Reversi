steal("funcunit", "../models/hello.js").then(function() {

	module("example",{
		setup: function() {
			S.open('http://localhost:8080/app/index.html');
		}
	});
	
	test("says hello",function() {
		S('p').visible(function() {
			equal( S('p').text(), "Hello, World!");
		});
//		function hello() {
//			return "Hello, World!";
//		}
		
		equal( hello(), "Hello, World!");
	});
});
