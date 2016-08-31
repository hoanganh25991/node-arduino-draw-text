var five = require('johnny-five');
var board = new five.Board({ port: 'COM7' });
// var drawText = require('./draw-text');
var drawTxt = require('./draw-text-v2');

board.on('ready', function() {
	var matrix = new five.Led.Matrix({
		pins: {
			data: 2,
			clock: 3,
			cs: 4
		},
		devices: 4
	});
	matrix.on();

	matrix.board = board;

	matrix.MATRIX_CHARS = five.LedControl.MATRIX_CHARS;

	matrix.drawText = drawTxt.bind(matrix);

	this.repl.inject({
		matrix: matrix
	});

});