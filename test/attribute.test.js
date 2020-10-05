const Attribute = require("../model/attribute");

const Dom = require("../model/dom");

test('Constructor', () => {
	let attribute = new Attribute('id', 'contenedorTexto');
	expect(attribute.getKey()).toBe('id');
	expect(attribute.getValue()).toBe('contenedorTexto');
});