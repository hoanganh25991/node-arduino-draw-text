var five = require("johnny-five");
var board = new five.Board();
var charMatrixByColumn = require('./matrix-transform');
// var drawText = require('./drawText');
// console.log(drawText);

board.on("ready", function(){

	var matrix = new five.Led.Matrix({
		pins: {
			data: 2,
			clock: 3,
			cs: 4
		},
		devices: 4
	});

	matrix.on();

	// var display = matrix.device(0);
	
	// var matrixFont = five.LedControl.MATRIX_CHARS;


	// var drawText = function (text){
	// 	var tmp = {};
	//
	// 	var charArr = text.split('');
	//
	// 	// console.log(charArr);
	// 	var bArr = [];
	//
	// 	charArr.forEach(function(ch){
	// 		bArr = bArr.concat(charMatrixByColumn(ch, matrixFont));
	// 		// var a = charMatrixByColumn(ch, matrixFont);
	// 		// console.log(a);
	// 		// bArr = bArr.concat([1,2]);
	// 	});
	//
	// 	// console.log(bArr);
	//
	// 	var refresh = setInterval(function(){
	// 		display.clear();
	// 		for(var i = 0; i < 8; i++){
	// 			display.column(i, bArr[i]);
	// 		}
	//
	// 		var b0 = bArr[0];
	// 		bArr.splice(0, 1);
	// 		bArr.push(b0);
	// 	}, 100);
	//
	// 	tmp.refresh = refresh;
	//
	// 	return tmp.refresh;
	// };
	//
	// drawText('anh le hoang');

	// console.log(a['b']);
	this.repl.inject({
		matrix: matrix,
		// matrixFont: matrixFont
	});
});