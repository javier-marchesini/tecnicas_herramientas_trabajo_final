const Element = require('./element');
const TagCompuesto = require("./tagCompuesto");
const EventListenerEnum = require("../../model/eventListener.enum");

class TagA extends TagCompuesto  {

	constructor(name) {
		super(name);
	}

	click(){
		this.notifyEvent(EventListenerEnum.ONCLICK);
	}

}

module.exports = TagA;
