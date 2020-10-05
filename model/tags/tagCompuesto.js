const SubjectListener = require('../subjectListener');

const Element = require('./element')

class TagCompuesto extends Element   {

	constructor(name) {
		super(name);
		this.childTags = [];
	}

	getChildTags(){
		return this.childTags;
	}

	addChild(child){
		this.childTags.push(child);
	}
	
	removeChild(index){
			this.childTags.splice(index, 1);
	}
	
	getChild(index) {
		return this.childTags[index];
	}

}

module.exports = TagCompuesto;
