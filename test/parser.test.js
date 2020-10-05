const ParseType = require('../model/ParseType');
const YAHParser = require('../model/YAHParser');
const ErrorMessage = require('../model/errorMessage.enum');

describe('Test Parser Errors Parser', () => {

	let htmlNonClosedTag = null;
	let htmlCorrectFilePath = null;
	let emptyHtmlDocumentFilePath = null;
	let nonExistentFilePath = null;

	beforeEach(() => {
		htmlCorrectFilePath = './test/files/htmlCorrectStrictParser.html';
		htmlNonClosedTag = './test/files/htmlNonClosedTag.html';
		emptyHtmlDocumentFilePath = './test/files/emptyHtmlDocument.html';
		nonExistentFilePath = './test/files/nonExistent.html';
	});

	test('Should test throw error invalid parser strategy', () => {
		expect(() => {
			new YAHParser(htmlCorrectFilePath,"DummyParserValue");
		  }).toThrowError(ErrorMessage.INVALID_PARSER_STRATEGY);
	});
	
	test('Should test throw error empty input file', () => {
		expect(() => {
			new YAHParser(emptyHtmlDocumentFilePath,ParseType.STRICT);
		  }).toThrowError(ErrorMessage.FILE_OPEN_EMPTY);
	});
		
	test('Should test throw error bad html input', () => {
		expect(() => {
			new YAHParser(htmlNonClosedTag,ParseType.STRICT);
		  }).toThrowError(ErrorMessage.INVALID_DOCUMENT_STRICT_PARSER);
	});
	
	test('Should test throw error invalid input file', () => {
		expect(() => {
			new YAHParser(nonExistentFilePath,ParseType.STRICT);
		  }).toThrowError(ErrorMessage.FILE_OPEN_ERROR);
	});

});

describe('Test Strict Parser', () => {

	let htmlCorrectFilePath = null;

	beforeEach(() => {
		htmlCorrectFilePath = './test/files/htmlCorrectStrictParser.html';
	});

	test('Should test strict parser strategy', () => {
		let parser = new YAHParser(htmlCorrectFilePath,ParseType.STRICT);
	
		let dom = parser.getDom();
		expect(dom.getMainNode().constructor.name).toBe('TagCompuesto');
		expect(dom.getMainNode().getName()).toBe('html');
		expect(dom.getMainNode().getChildTags().length).toBe(2);
		
		expect(dom.getMainNode().getChildTags()[0].constructor.name).toBe('TagCompuesto');
		expect(dom.getMainNode().getChildTags()[0].getName()).toBe('head');
		
		let head = dom.getMainNode().getChildTags()[0];
		expect(head.getChildTags().length).toBe(1);
		expect(head.getChildTags()[0].constructor.name).toBe('Tag');
		expect(head.getChildTags()[0].getName()).toBe('title');
		
		expect(dom.getMainNode().getChildTags()[1].constructor.name).toBe('TagCompuesto');
		expect(dom.getMainNode().getChildTags()[1].getName()).toBe('body');
		let body = dom.getMainNode().getChildTags()[1];
		expect(body.getChildTags().length).toBe(3);

		expect(body.getChildTags()[0].constructor.name).toBe('Tag');
		expect(body.getChildTags()[0].getName()).toBe('p');
		expect(body.getChildTags()[0].getAttributes().length).toBe(1);
		expect(body.getChildTags()[0].getAttributes()[0].getKey()).toBe("style");
		expect(body.getChildTags()[0].getAttributeByKey('style')[0].getKey()).toBe("style");
		
		expect(body.getChildTags()[1].constructor.name).toBe('Tag');
		expect(body.getChildTags()[1].getIsSelfClose()).toBeTruthy();
		expect(body.getChildTags()[1].getName()).toBe('img');
		expect(body.getChildTags()[1].getAttributes().length).toBe(2);
		expect(body.getChildTags()[1].getAttributes()[0].getKey()).toBe("src");
		expect(body.getChildTags()[1].getAttributes()[1].getKey()).toBe("alt");

	})
	

	

});

describe('Test Flexible Parser', () => {

	let htmlCorrectFlexibleParser,parser = null;

	beforeEach(() => {
		htmlCorrectFlexibleParser = './test/files/htmlCorrectFlexibleParser.html';
		parser = new YAHParser(htmlCorrectFlexibleParser,ParseType.FLEXIBLE);
	});

	test('Should test Flexible Parser strategy', () => {

		let dom = parser.getDom();
		expect(dom.getMainNode().constructor.name).toBe('TagCompuesto');
		expect(dom.getMainNode().getName()).toBe('html');
		expect(dom.getMainNode().getChildTags().length).toBe(2);
		
		expect(dom.getMainNode().getChildTags()[0].constructor.name).toBe('TagCompuesto');
		expect(dom.getMainNode().getChildTags()[0].getName()).toBe('head');
		
		let head = dom.getMainNode().getChildTags()[0];
		expect(head.getChildTags().length).toBe(1);
		expect(head.getChildTags()[0].constructor.name).toBe('Tag');
		expect(head.getChildTags()[0].getName()).toBe('title');
		
		expect(dom.getMainNode().getChildTags()[1].constructor.name).toBe('TagCompuesto');
		expect(dom.getMainNode().getChildTags()[1].getName()).toBe('body');
		let body = dom.getMainNode().getChildTags()[1];
		expect(body.getChildTags().length).toBe(2);

		let container1 = body.getChildTags()[0];
		expect(container1.constructor.name).toBe('TagCompuesto');
		expect(container1.getName()).toBe('div');
		expect(container1.getAttributes().length).toBe(1);
		expect(container1.getAttributes()[0].getKey()).toBe("id");
		expect(container1.getAttributes()[0].getValue()).toBe("container1");
		expect(container1.getChildTags().length).toBe(1);

		let container2 = body.getChildTags()[1];
		expect(container2.constructor.name).toBe('TagCompuesto');
		expect(container2.getName()).toBe('div');
		expect(container2.getAttributes().length).toBe(1);
		expect(container2.getAttributes()[0].getKey()).toBe("id");
		expect(container2.getAttributes()[0].getValue()).toBe("container2");
		expect(container2.getChildTags().length).toBe(2);

		let container2Child1 = container2.getChildTags()[0];
		expect(container2Child1.constructor.name).toBe('Tag');
		expect(container2Child1.getName()).toBe('p');
		expect(container2Child1.getAttributes().length).toBe(1);
		expect(container2Child1.getAttributes()[0].getKey()).toBe("style");
		expect(container2Child1.getAttributes()[0].getValue()).toBe("color:blue");

		let container2Child2 = container2.getChildTags()[1];
		expect(container2Child2.constructor.name).toBe('TagCompuesto');
		expect(container2Child2.getName()).toBe('form');
		expect(container2Child2.getAttributes().length).toBe(2);
		expect(container2Child2.getAttributes()[0].getKey()).toBe("action");
		expect(container2Child2.getAttributes()[1].getKey()).toBe("method");
		expect(container2Child2.getChildTags().length).toBe(3);

	})

});


