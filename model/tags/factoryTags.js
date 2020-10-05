const Tag = require('./tag.js');
const TagCompuesto = require('./tagcompuesto.js');
const TagInput = require('./taginput.js');
const TagA = require('./tagA.js');

class FactoryTag {

	constructor() {
		this.leafTags = ['p','a','img','title'];

	}

	createTag(tagName){
		let element = null; 
		if (this.leafTags.includes(tagName)){
			element = tagName === 'a' ? new TagA(tagName) : new Tag(tagName);
		}else{
			element = tagName === 'input' ? new TagInput(tagName) : new TagCompuesto(tagName);
		}
		return element;
	}

}

module.exports = FactoryTag;
