const ParseStrategy = require('../strategy/parseStrategy');
const Attributte = require('../model/attribute');
const FactoryTag = require("../model/tags/factoryTags");
const TagCompuesto = require("../model/tags/tagCompuesto");
const Position= require("../model/tags/position");
const ErrorMessage = require("../model/errorMessage.enum");


class StrictParser extends ParseStrategy {

	constructor() {
		super();
		this.regexHtmlTags = /(?:<(\/?)([a-zA-Z]*)(?:\s([^>]*?))?((?:\s*\/)?)>)/gm;
		this.regexAttributes = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/gim,
		this.regexHtmlTags.lastIndex = 0;
		this.selfClosedTags = ['img','input'];
		this.nodes = [];
		this.factoryTags = new FactoryTag();
	}

	getElements(){
		return this.nodes;
	}

	parse(htmlString){
		let match = null;
		let parentTag  =  new TagCompuesto('html');
		let currentTag = parentTag;

		while ((match = this.regexHtmlTags.exec(htmlString))) {
			if (match[1] !== '/') {
				currentTag = this.factoryTags.createTag(match[2].toLowerCase());
				currentTag.setOpenTagPosition(new Position(this.regexHtmlTags.lastIndex - match[0].length, this.regexHtmlTags.lastIndex));
				currentTag.setParentTag(parentTag);
				currentTag.setAttributes(this.__parseAttributes(match[3]));

				if (currentTag.getParentTag().constructor.name === "TagCompuesto"){
					if (currentTag.getName() != 'html')
						currentTag.getParentTag().addChild(currentTag);
				}else{
					throw new Error(ErrorMessage.INVALID_DOCUMENT_STRICT_PARSER);
				}

				this.nodes.push(currentTag);

				if ( (match[4] && match[4].indexOf('/') != -1) || this.selfClosedTags.indexOf(currentTag.getName()) != -1    ) {
					currentTag.setCloseTagPosition(new Position(this.regexHtmlTags.lastIndex - match[0].length, this.regexHtmlTags.lastIndex));
					currentTag.setHtml(htmlString.substring(currentTag.getOpenTagPosition().getStart(), currentTag.getCloseTagPosition().getEnd()));
					currentTag.setIsSelfClose(true);
				}
				else {
					parentTag = currentTag;
				}

			} else {
				if ((match[2]+'').toLowerCase()===parentTag.getName()) {
					currentTag = parentTag;
					parentTag = currentTag.getParentTag();
					currentTag.setCloseTagPosition(new Position(this.regexHtmlTags.lastIndex - match[0].length, this.regexHtmlTags.lastIndex));
					currentTag.setHtml(htmlString.substring(currentTag.getOpenTagPosition().getStart(), currentTag.getCloseTagPosition().getEnd()));
				}else {
					throw new Error(ErrorMessage.INVALID_DOCUMENT_STRICT_PARSER);
				}
			}
		}

		return this.nodes[0];
	}


	__parseAttributes(stringAttributtes) {
		
		let attributes = [];
		this.regexAttributes.lastIndex = 0;
		let regexMatch =null;
		while ((regexMatch=this.regexAttributes.exec(stringAttributtes)) ) {
			let attribute = new Attributte(regexMatch[1],regexMatch[2]);
			attributes.push(attribute)
		}
		
		return 	attributes;
	}

}

module.exports = StrictParser;