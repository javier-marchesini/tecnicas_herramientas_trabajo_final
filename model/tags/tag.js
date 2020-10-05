const SubjectListener = require('../subjectListener');
const ClickListener = require('../../eventListener/clickListener.js');
const EventListener = require('../../eventListener/eventListener.js');
const Element = require('./element')

class Tag extends Element {

	constructor(name) {
		super(name);
	}

}

module.exports = Tag;
