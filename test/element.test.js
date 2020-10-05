const Attribute = require('../model/attribute');
const ClickListener = require('../eventListener/clickListener');
const ChangeListener = require('../eventListener/changeListener');
const TagCompuesto = require("../model/tags/tagCompuesto");
const TagInput = require("../model/tags/tagInput");
const TagA = require('../model/tags/tagA');
const Tag = require('../model/tags/tag');
const Position = require('../model/tags/position');
const ErrorMessage = require("../model/errorMessage.enum");
const EventListenerEnum = require("../model/eventListener.enum");

describe('Should test constructors of elements types',() => {

	test('Should test constructor of TagCompuesto', () => {
		let tagCompuesto = new TagCompuesto();
		expect(tagCompuesto).not.toBeNull();
		expect(tagCompuesto.getParentTag()).toBeNull();
		expect(tagCompuesto.getAttributes().length).toBe(0);
		expect(tagCompuesto.getChildTags().length).toBe(0);
		expect(tagCompuesto.getOpenTagPosition()).toBeNull();
		expect(tagCompuesto.getCloseTagPosition()).toBeNull();
	});

	test('Should test constructor of TagA', () => {
		let tag = new TagA();
		expect(tag).not.toBeNull();
		expect(tag.getChildTags().length).toBe(0);
		expect(tag.getParentTag()).toBeNull();
		expect(tag.getAttributes().length).toBe(0);
		expect(tag.getOpenTagPosition()).toBeNull();
		expect(tag.getCloseTagPosition()).toBeNull();
	});

	test('Should test constructor of TagInput', () => {
		let tagInput = new TagInput();
		expect(tagInput).not.toBeNull();
		expect(tagInput.getParentTag()).toBeNull();
		expect(tagInput.getAttributes().length).toBe(0);
		expect(tagInput.getOpenTagPosition()).toBeNull();
		expect(tagInput.getCloseTagPosition()).toBeNull();
		expect(tagInput.getText()).toBe('');
	});	

	test('Should test constructor of Tag', () => {
		let tag = new Tag();
		expect(tag).not.toBeNull();
		expect(tag.getParentTag()).toBeNull();
		expect(tag.getAttributes().length).toBe(0);
		expect(tag.getOpenTagPosition()).toBeNull();
		expect(tag.getCloseTagPosition()).toBeNull();
	});	

})

describe('Should test tags creation and relations between that and attributtes', () => {
	let tagImg,tagA,parentTag = null;
	
	beforeEach(() => {
		parentTag = new TagCompuesto();
		parentTag.setName("div");
		parentTag.setHtml('<div><img src="https://www.w3.org/Icons/w3c_home"/><a>esto es un link</a></div>');
		parentTag.setOpenTagPosition(new Position(0,5));
		parentTag.setCloseTagPosition(new Position(76,80));

		tagImg = new Tag();
		tagImg.setName("img");
		tagImg.setOpenTagPosition(20);
		tagImg.setParentTag(parentTag);
		tagImg.getParentTag().addChild(tagImg);
		tagImg.setHtml('<img src="https://www.w3.org/Icons/w3c_home"/>');
		tagImg.setOpenTagPosition(new Position(5,51));
		tagImg.setCloseTagPosition(new Position(5,51));
		
		tagA = new TagA();
		tagA.setName("a");
		tagA.setOpenTagPosition(20);
		tagA.setParentTag(parentTag);
		tagA.getParentTag().addChild(tagA);
		tagA.setHtml('<a>esto es un link</a>');
		tagA.setOpenTagPosition(new Position(52,55));
		tagA.setCloseTagPosition(new Position(70,73));

	});

	test('Should check asociation between Parent and Childrens', () => {
		expect(tagImg.getParentTag()).toBe(parentTag);
		expect(tagA.getParentTag()).toBe(parentTag);
		expect(parentTag.getChildTags()[0]).toBe(tagImg);
		expect(parentTag.getChildTags()[1]).toBe(tagA);
		expect(parentTag.getChildTags().length).toBe(2);
	});

	test('Should test deleted children', () => {
		parentTag.removeChild(1);
		expect(parentTag.getChildTags().length).toBe(1);
	});

	test('Should test attributtes added to parentTag', () => {
		let attr1 = new Attribute('id','contenedor');
		let attr2 = new Attribute('style', 'padding:10px')
		parentTag.getAttributes().push(attr1);
		parentTag.getAttributes().push(attr2);
		expect(parentTag.getAttributes().length).toBe(2);
		expect(parentTag.getAttributes()[0]).toBe(attr1);
		expect(parentTag.getAttributes()[1]).toBe(attr2);
	});

	test('Should test text from element a',() => {
		expect(tagA.getTextVersion()).toBe('esto es un link\r\n');
	});

});

describe('Test event listeners', () => {

	test('Should test registered EventListener onClick call', () => {

		let tag = new TagA();
		tag.setName("a");
		let mockClickFuncion = jest.fn();
		let  click = new ClickListener(mockClickFuncion);
		tag.addEventListener(EventListenerEnum.ONCLICK, click);
		expect(mockClickFuncion).toHaveBeenCalledTimes(0);
		tag.click();
		expect(mockClickFuncion).toHaveBeenCalledTimes(1);
		
	});

	test('Should test registered EventListener onChange call', () => {
		let tag = new TagInput();
		tag.getAttributes().push(new Attribute('type','text'));
		tag.setName("input");
		let mockChangeFuncion = jest.fn();
		let change = new ChangeListener(mockChangeFuncion);
		tag.addEventListener(EventListenerEnum.ONCHANGE, change);
		let textoNuevo = 'Este es un nuevo texto';
		expect(mockChangeFuncion).toHaveBeenCalledTimes(0);
		tag.setText(textoNuevo);
		expect(mockChangeFuncion).toHaveBeenCalledTimes(1);
		expect(tag.getText()).toBe(textoNuevo);
	});


	test('Should test invalid EventListener for input type text ', () => {
		let mockClickFuncion = jest.fn();
		let clickEvent = new ClickListener(mockClickFuncion);

		let inputText = new TagInput();
		inputText.setName("input");
		inputText.getAttributes().push(new Attribute('type','text'));

		expect(() => {
			inputText.addEventListener(EventListenerEnum.ONCLICK, clickEvent);
		}).toThrowError(ErrorMessage.EVENT_LISTENER_INPUT_INVALID_REGISTRATION);
		
	});

	test('Should test invalid EventListener for input type button ', () => {
		let mockChangeFuncion = jest.fn();
		let change = new ChangeListener(mockChangeFuncion);

		let inputButton= new TagInput();
		inputButton.setName("input");
		inputButton.getAttributes().push(new Attribute('type','button'));

		expect(() => {
			inputButton.addEventListener(EventListenerEnum.ONCHANGE, change);
		}).toThrowError(ErrorMessage.EVENT_LISTENER_INPUT_INVALID_REGISTRATION);
		
	});


	test('Should test error not registered EventListener onClick', () => {

		let tag = new TagA();
		tag.setName("a");

		expect(() => {
			tag.removeEventListener(EventListenerEnum.ONCLICK)
		}).toThrowError(ErrorMessage.EVENT_LISTENER_NOT_REGISTERED);
	});

	test('Should test error registered same EventListener - onClick  ', () => {

		let tag = new TagA();
		tag.setName("a");
		let mockClickFuncion = jest.fn();
		let  click = new ClickListener(mockClickFuncion);
		tag.addEventListener(EventListenerEnum.ONCLICK, click);
		expect(() => {
			tag.addEventListener(EventListenerEnum.ONCLICK, click);
		  }).toThrowError(ErrorMessage.EVENT_LISTENER_REGISTERED);
		
	});

	test('Should test error remove not registeres EventListener - onClick  ', () => {

		let tag = new TagA();
		tag.setName("a");

		expect(() => {
			tag.removeEventListener(EventListenerEnum.ONCLICK);
		  }).toThrowError(ErrorMessage.EVENT_LISTENER_NOT_REGISTERED);
		
	});
	
	test('Should test error invalid EventListener - onClick  ', () => {

		let tag = new TagA();
		tag.setName("a");
		expect(() => {
			tag.addEventListener("invalidEvent", new Object());
		  }).toThrowError(ErrorMessage.EVENT_LISTENER_INVALID);
		
	});

});

