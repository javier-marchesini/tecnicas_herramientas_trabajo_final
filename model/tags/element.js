const SubjectListener = require('../subjectListener');
const ClickListener = require('../../eventListener/clickListener.js');
const EventListener = require('../../eventListener/eventListener.js');
const ErrorMessage = require("../errorMessage.enum");

class Element extends SubjectListener  {

	constructor(name) {
		super();
		this.name = name;
		this.html = null;
		this.parentTag = null;
		this.isSelfClose = false;
		this.openTagPosition = null;
		this.closeTagPosition = null;
		this.attributes = [];
		this.eventListeners = {};
	}
	
	getName(){
		return this.name;
	}

	setName(name){
		this.name = name;
	}

	getParentTag(){
		return this.parentTag;
	}

	setParentTag(parentTag){
		this.parentTag = parentTag;
	}

	getChildTags(){
		return this.childTags;
	}

	setAttributes(attributes){
		this.attributes = attributes;
	}

	getAttributes(){
		return this.attributes;
	}

	getAttributeByKey(key){
		return this.attributes.filter(function (attribute) {
			return attribute.key == key;
		});
	}

	getIsSelfClose(){
		return this.isSelfClose;
	}

	setIsSelfClose(isSelfClose){
		this.isSelfClose = isSelfClose;
	}

	getOpenTagPosition(){
		return this.openTagPosition;
	}

	setOpenTagPosition(openTagPosition){
		this.openTagPosition = openTagPosition;
	}

	getCloseTagPosition(){
		return this.closeTagPosition;
	}

	setCloseTagPosition(closeTagPosition){
		this.closeTagPosition = closeTagPosition;
	}

	setHtml(html){
		this.html = html;
	}

	getHtml(){
		return this.html;
	}

	getEventListeners(){
		return this.eventListeners;
	}

	addEventListener(eventListenerName, eventListener){

		if (eventListener instanceof EventListener != true ){
			throw new Error(ErrorMessage.EVENT_LISTENER_INVALID);
		}

		if (this.__isEventRegistered(eventListenerName) ){
			throw new Error(ErrorMessage.EVENT_LISTENER_REGISTERED);
		}
		
		this.eventListeners[eventListenerName] = eventListener;
		
	}
	
	removeEventListener(eventListenerName){
		if (!this.__isEventRegistered(eventListenerName) ){
			throw new Error(ErrorMessage.EVENT_LISTENER_NOT_REGISTERED);
			
		}
		delete this.eventListeners[eventListenerName];

	}
	
	notifyEvent(eventListenerName){
		if (this.__isEventRegistered(eventListenerName)){
			let event = this.eventListeners[eventListenerName];
			event.sendEvent();
		}
	}	

	__getEventListenerByName(eventListenerName){
		return this.eventListeners[eventListenerName];
	}

	__isEventRegistered(eventListenerName){
		return this.__getEventListenerByName(eventListenerName) != undefined;
	}

	addChild(child){
		throw new Error(ErrorMessage.ABSTRACT_METHOD);
	}
	
	removeChild(index){
		throw new Error(ErrorMessage.ABSTRACT_METHOD);
	}
	
	getChild(index) {
		throw new Error(ErrorMessage.ABSTRACT_METHOD);
	}

	getTextVersion(node){
	
		let string = "";
		let initialValue = this.getOpenTagPosition().getStart();
		let pointer =  this.getOpenTagPosition().getEnd() - initialValue; 
		let initialHtmlPosition = this.getOpenTagPosition().getEnd() - this.getOpenTagPosition().getStart();

		if(this.getIsSelfClose() == true){
			return "\r\n"
		}
		
		if (this.constructor.name == "TagCompuesto"){
			if(this.getChildTags().length == 0 ) {
				string = (this.getHtml()).substring(initialHtmlPosition, this.getCloseTagPosition().getStart()- initialValue ).trim() + '\r\n';
			
			}else{
				for (let index = 0; index < this.getChildTags().length; index++) {
					let substring = this.getHtml().substring(pointer,this.getChildTags()[index].getOpenTagPosition().getStart() - initialValue);				
					string += substring.trim(); 
					string += (this.getChildTags()[index]).getTextVersion() + '\r\n'; 
					pointer = (this.getChildTags()[index]).getCloseTagPosition().getEnd() - initialValue;
				}
			}
		}else{
			string = (this.getHtml()).substring(initialHtmlPosition,   this.getCloseTagPosition().getStart()- initialValue ).trim() + '\r\n';
		}
		
		return string;
	}

}

module.exports = Element;
