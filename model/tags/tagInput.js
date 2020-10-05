const Tag = require('./tag');
const EventListenerEnum = require('../eventListener.enum');
const ErrorMessage = require('../errorMessage.enum')

class TagInput extends Tag {

	constructor(name) {
		super(name);
		this.text = "";
	}

	addEventListener(eventListenerName, eventListener){
		if( (this._isButtonInput() && eventListenerName == EventListenerEnum.ONCLICK) || (this._isTextInput() &&  eventListenerName == EventListenerEnum.ONCHANGE) ){
			super.addEventListener(eventListenerName, eventListener);
		}else{
			throw new Error(ErrorMessage.EVENT_LISTENER_INPUT_INVALID_REGISTRATION);
		}
	}

	setText(text){
		if(!this._isTextInput()){
			throw new Error(ErrorMessage.EVENT_INPUT_INVALID);
		}
		this.text = text;
		this.notifyEvent(EventListenerEnum.ONCHANGE);
	}

	getText(){
		return this.text;
	}

	click(){
		if( !this._isButtonInput()){
		 	throw new Error(ErrorMessage.EVENT_INPUT_INVALID);
		}
		this.notifyEvent(EventListenerEnum.ONCLICK);
	}


	_isTextInput(){
		if ( this.getAttributeByKey("type") .length == 0 ) return  false ;
		if ( this.getAttributeByKey("type")[0].getValue() === 'text') return true;
		return false;
	}

	_isButtonInput(){
		if ( this.getAttributeByKey("type") .length == 0 ) return  false ;
		if ( this.getAttributeByKey("type")[0].getValue() === 'button') return true;
		return false;
	}

}

module.exports = TagInput;
