const ParseStrategy = require('../strategy/parseStrategy');
const Attributte = require('../model/attribute');
const FactoryTag = require("../model/tags/factoryTags");
const TagCompuesto = require("../model/tags/tagCompuesto");
const Position= require("../model/tags/position");



class FlexibleParser extends ParseStrategy{

	constructor() {
		super()
		this.regexHtmlTags = /(?:<(\/?)([a-zA-Z]*)(?:\s([^>]*?))?((?:\s*\/)?)>)/gm;
		this.regexAttributes = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/gim,
		this.regexHtmlTags.lastIndex = 0;
		this.selfClosedTags = ['img','input'];
		this.nodes = [];
		this.matches = [];
		this.htmlString = "";
		this.factoryTags = new FactoryTag();

	}

	getElements(){
		return this.nodes;
	}

	parse(htmlString){
		let match = null;
		let parentTag  =  new TagCompuesto();
		let currentTag = parentTag;

		while ((match = this.regexHtmlTags.exec(htmlString))) {
			this.matches.push(match);
			
			if (match[1] !== '/' && currentTag.constructor.name === 'Tag' && parentTag.constructor.name === 'Tag' ) {

				let positionAddTag = this.regexHtmlTags.lastIndex-match[0].length;
				let closeTag = "</"+currentTag.getName()+">";
				this.matches.splice(-1,1);
				this.regexHtmlTags.lastIndex = this.matches[this.matches.length-1].index + match[0].length;
				htmlString =  htmlString.slice(0, positionAddTag) + closeTag + htmlString.slice(positionAddTag,htmlString.length);
				match.input =  htmlString;
		
			}else{

				if (match[1] !== '/') {
						
					currentTag = this.factoryTags.createTag(match[2].toLowerCase());
					currentTag.setOpenTagPosition(new Position(this.regexHtmlTags.lastIndex - match[0].length, this.regexHtmlTags.lastIndex));
					currentTag.setParentTag(parentTag);
					currentTag.setAttributes(this.__parseAttributes(match[3]));
					
					if (currentTag.getName() != 'html' && parentTag.constructor.name === "TagCompuesto"){
						currentTag.getParentTag().addChild(currentTag);
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

					}else{
						currentTag = parentTag;
						let positionAddTag = this.regexHtmlTags.lastIndex-match[0].length;
						let closeTag = "</"+parentTag.getName()+">";
						this.matches.splice(-1,1);
						this.regexHtmlTags.lastIndex = positionAddTag;
						htmlString =  htmlString.slice(0, positionAddTag) + closeTag + htmlString.slice(positionAddTag,htmlString.length);
						match.input =  htmlString;
					}
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

module.exports = FlexibleParser;