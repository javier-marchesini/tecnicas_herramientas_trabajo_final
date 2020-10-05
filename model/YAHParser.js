const Dom = require("../model/dom.js");
const ParseType = require('../model/ParseType.js');
const StrictParser = require('../strategy/strictParser.js');
const FlexibleParser = require('../strategy/flexibleParser.js');
const TagCompuesto = require('./tags/tagCompuesto.js')
const Element = require('./tags/element.js')
const ErrorMessage = require("./errorMessage.enum.js");
const fs = require('fs');

class YAHParser {
	constructor(pathFileHtml,strategy) {
		let sourceHtml = "";

		try {
			sourceHtml = fs.readFileSync(pathFileHtml, 'utf8');
		  } catch (err) {
			throw ErrorMessage.FILE_OPEN_ERROR;
		}
		if (sourceHtml == "" || sourceHtml == null){
			throw  ErrorMessage.FILE_OPEN_EMPTY;
		}

		this.dom = new Dom(sourceHtml);
		this.strategy = strategy;
		this.paserDocument();
	}

	paserDocument() {
		let parserStrategy = null;
		switch (this.strategy) {
			case ParseType.STRICT:
				parserStrategy = new StrictParser();
				break;
			case ParseType.FLEXIBLE:
				parserStrategy = new FlexibleParser();
				break;
			default:
				throw ErrorMessage.INVALID_PARSER_STRATEGY;
			break;
		}
		this.dom.setMainNode(parserStrategy.parse(this.dom.getSourceHtml()));

	}

	getstrategy(){
		return this.strategy;
	}

	getDom(){
		return this.dom;
	}


	getTextVersion(){
		return this.getDom().getTextVersion();
	}

	printResultParse(){
		
		console.log('██╗   ██╗ █████╗ ██╗  ██╗██████╗     ██████╗  █████╗ ██████╗ ███████╗███████╗██████╗ ');
		console.log('╚██╗ ██╔╝██╔══██╗██║  ██║██╔══██╗    ██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗');
		console.log(' ╚████╔╝ ███████║███████║██████╔╝    ██████╔╝███████║██████╔╝███████╗█████╗  ██████╔╝');
		console.log('  ╚██╔╝  ██╔══██║██╔══██║██╔═══╝     ██╔═══╝ ██╔══██║██╔══██╗╚════██║██╔══╝  ██╔══██╗');
		console.log('   ██║   ██║  ██║██║  ██║██║         ██║     ██║  ██║██║  ██║███████║███████╗██║  ██║');
		console.log('   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝         ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝');
		console.log('_____________________________________________________________________________________');
		console.log(Date());
		console.log('\n','\n','\n');
		console.log('PARSER STRATEGY: ' + this.strategy);
		console.log('═════════════════════════════════════════════════════════════════════════════════════');
		
		this.printDomTree(this.dom.getMainNode(),0);
		
		console.log('\n','\n','\n');
		console.log('\x1b[0m',"TEXT VERSION");
		console.log('═════════════════════════════════════════════════════════════════════════════════════');

		console.log(this.getTextVersion());
		
	}


	/*Funcion armada para mostrar el arbol en consola*/
	printDomTree(node,i){
		let strSpace ="";
		for (let m = 0; m < i; m++) {
			strSpace+="|   ";
		}
		if (node.constructor.name == "TagCompuesto"){
			if(node.getChildTags().length > 0){
				console.log('\x1b[33m', strSpace+ '+--'+ node.getName() + " | ",'\x1b[32m' ,node.constructor.name+" | ", '\x1b[36m', 'Attr= '+JSON.stringify(node.getAttributes()));
			}else{
				console.log('\x1b[33m', strSpace+ '/\--'+ node.getName() + " | ",'\x1b[32m' ,node.constructor.name+" | ", '\x1b[36m', 'Attr= '+JSON.stringify(node.getAttributes()));
			}
		}else{
			console.log('\x1b[33m', strSpace+ '/\--'+ node.getName() + " | ",'\x1b[32m' ,node.constructor.name+" | ", '\x1b[36m', 'Attr= '+ JSON.stringify(node.getAttributes()));
		}
	
		if (node.constructor.name == "TagCompuesto"){
			if (node.getChildTags().length > 0){
				i++;
				for(let indexChild = 0 ; indexChild < node.getChildTags().length; indexChild++){
					this.printDomTree(node.getChildTags()[indexChild],i);
				}
			}else{
				return -1;
			}
		}else{
			return -1;
		}
	}


	

}





module.exports = YAHParser;
