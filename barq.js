'use strict';

var fs = require('fs'),
		argv = require('minimist')(process.argv.slice(2)),
		_ = require('underscore'),
		serial = require('./serialnumber.js'),
		qr = require('./qr.js');

// command line options
var options = {
	base: argv.base || argv.b, 
	amount: argv.amount || argv.a || 10, 
	length: argv.length || argv.l || 25,
	chars: argv.chars || argv.c || 'a#',
	gen: argv.gen || argv.g || 'all',
	template: (argv.template) ? 'templates/'+argv.template : 'templates/sheet.html'
};

var html = [];

for(var i = 0; i < options.amount; i++) {
	_callback(i);
}

function _callback(index){
	var	result = {};

	serial.genSerialNum(options.length, options.chars, function(serialNum){
		// save serial number in result
		result.serial = serialNum;		

		// now create the qr
		if(options.gen === 'qr'){
			qr.genQR(serialNum, options.base, function(err, pathToQR){
				if(err) throw err;
				
				// save the qr code in result
				result.qr = pathToQR;
			
				// finally build result		
				build(result, options.template, function(result){
					html.push(result);

					if(index === options.amount - 1){
						putTogether(html);
					}
				});//end build
			});//end genQR
		}
		else if(options.gen === 'bar'){
			// finally build result		
			build(result, options.template, function(result){
				html.push(result);

				if(index === options.amount - 1){
					putTogether(html);
				}
			});//end build
		}
		else if(options.gen === 'all'){
			qr.genQR(serialNum, options.base, function(err, pathToQR){
				if(err) throw err;
				
				// save the qr code in result
				result.qr = pathToQR;
			
				// finally build result		
				build(result, options.template, function(result){
					html.push(result);

					if(index === options.amount - 1){
						putTogether(html);
					}
				});//end build
			});//end genQR
		}
		else {
			throw new Error('That is not a supported option for --gen. See README.');
		}
	});//end genSerialNumber
}

/**
 * Builds the html for one QR Code/Bar code/Serial Num combo based on passed template
 * @param  {Object} result   [Object containing the genrated QR code/Bar code/Serial Num]
 * @param  {String} template [Path to template file]
 */
function build(data, template, callback){
	var product, temp, productString;

	// read template file and make replacements
	temp = fs.readFileSync(template, 'utf8').toString();
	product = _.template(temp);

	productString = product({
		results: data
	});

	if(typeof callback === 'function'){
		callback(productString);
	}
}

/**
 * Puts all the HTML together 
 * @param  {Array} html [array containing all the html segments for each item]
 */
function putTogether(html){
	var read, 
			write, 
			rawHTML = '';

	for(var i = 0; i < html.length; i++) {
		rawHTML += html[i];
	}
	
	read = fs.readFileSync('default.html', 'utf8').toString();
	write = read.replace('{{items}}', rawHTML);
	fs.writeFileSync('output/index.html', write);
}