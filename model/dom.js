
class Dom  {

	constructor(sourceHtml) {
		this.sourceHtml = sourceHtml;
		this.node = null;

	}

	getSourceHtml(){
		return this.sourceHtml;
	}

	getMainNode(){
		return this.node;
	}

	setMainNode(node){
		this.node = node;
	}
	
	getTextVersion(){
		return this.getMainNode().getTextVersion();
	}

}

module.exports = Dom;
