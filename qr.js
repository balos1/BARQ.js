'use strict';

var qrcode = require('qrcode');

exports.genQR = function (filename, base, callback){
	var path = 'output/assets/' + filename + '.png',
			data = base + '/' + filename;


	qrcode.save(path, data, function(err){
		var pathToQR = 'assets/' + filename + '.png';
		
		if(typeof callback === 'function'){
			callback(err, pathToQR);
		}
	});
}
