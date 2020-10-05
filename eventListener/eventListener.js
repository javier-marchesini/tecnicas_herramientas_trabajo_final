class EventListener {
	
	constructor(){ 
		
	}

	sendEvent(){
		throw new Error('This is an Abstract Method. You have to implement the method in Concrete Class');
	}


}

module.exports = EventListener;
