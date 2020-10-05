const EventListener = require('./eventListener');

class ChangeListener extends EventListener {
	
	constructor(changeFunction){ 
		super();
		this.function = changeFunction;
		this.onChange = function functionCallback(callback) {
			callback();		
		}
	}

	sendEvent(){
		this.onChange(this.function);
	}
}
module.exports = ChangeListener;
