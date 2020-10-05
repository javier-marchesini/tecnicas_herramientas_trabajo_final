
class ParseStrategy {

	constructor(){
	}

	parse(parse) {
		throw new Error('This is an Abstract Method. You have to implement the method in Concrete Class');
	}
	
}

module.exports = ParseStrategy;