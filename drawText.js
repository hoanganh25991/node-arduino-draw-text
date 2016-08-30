var charMatrixByColumn = require("./matrix-transform.js");

var drawText = function (text, matrixFont, display){
	var tmp = {};
	
	var charArr = text.split('');
	
	var bArr = [];
	
	charArr.forEach(function(ch){
		bArr.concat(charMatrixByColumn(ch, matrixFont));
	});

	var refresh = setInterval(function(){
		for(var i = 0; i < 8; i++){
			display.column(i, bArr[i]);
		}

		var b0 = bArr[0];
		bArr.splice(0, 1);
		bArr.push(b0);
	}, 500);

	tmp.refresh = refresh;
	
	return tmp.refresh;
};

module.exports = drawText;

