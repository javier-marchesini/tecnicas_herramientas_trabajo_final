const FactoryTag = require("../model/tags/factoryTags");
const Tag = require('../model/tags/tag.js');
const TagCompuesto = require('../model/tags/tagcompuesto.js');
const TagInput = require('../model/tags/taginput.js');
const TagA = require('../model/tags/tagA.js');

test('Should test Factory objects creation ', () => {
	let factory  = new FactoryTag();
	
	let tagA = 	factory.createTag("a");
	expect(tagA instanceof TagA).toBeTruthy();
	
	let tagDiv = 	factory.createTag("div");
	expect(tagDiv instanceof TagCompuesto).toBeTruthy();

	let tagImg = 	factory.createTag("img");
	expect(tagImg instanceof Tag).toBeTruthy();
	
	let tagInput = 	factory.createTag("input");
	expect(tagInput instanceof TagInput).toBeTruthy();
	
});