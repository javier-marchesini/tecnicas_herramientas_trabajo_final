const EventListener = require('./eventListener');

class ClickListener extends EventListener {
	
	constructor(clickFunction){ 
		super();
		this.function = clickFunction;
		this.onClick = function functionCallback(callback) {
			callback();		
		}
	}

	sendEvent(){
		this.onClick(this.function);
	}
}
module.exports = ClickListener;
