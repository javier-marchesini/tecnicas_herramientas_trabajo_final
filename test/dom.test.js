const Dom = require("../model/dom");

let html = null;
beforeEach(() => {
	html =
	`	<html>
			<head>
				<title>Test HTML /title>
			</head>
			<body>
				<div>
					<p>Hello World!</p>
					<img src="https://www.w3.org/Icons/w3c_home" alt="Logo W3C">
				</div>
			</body>
		</html>
	`;
}); 

test('Should test Constructor', () => {
	let dom = new Dom(html);
	expect(dom.getSourceHtml()).toBe(html);
	expect(dom.getMainNode()).toBe(null);
});