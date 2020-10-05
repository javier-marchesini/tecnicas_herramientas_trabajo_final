class SubjectListener {

	constructor() {
		//throw new Error('Cannot instanciate abstract class');
	}

	addEventListener(eventListener){
		throw new Error(ErrorMessage.ABSTRACT_METHOD);
	}

	notifyEvent(eventListenerName){
		throw new Error(ErrorMessage.ABSTRACT_METHOD);
	}

	removeEventListener(eventListener){
		throw new Error(ErrorMessage.ABSTRACT_METHOD);
	}
}

module.exports = SubjectListener;
