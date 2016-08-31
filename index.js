var five = require('johnny-five');
var board = new five.Board({ port: 'COM7' });
var drawText = require('./draw-text');

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

	// for(var i = 0; i < matrix.devices; i++){
	// 	matrix.on(i);
	// }

	matrix.drawText = drawText.bind(matrix);

	var buffer = require('./buffer')(
						'123456789',
						five.LedControl.MATRIX_CHARS,
						matrix.devices
					);

	board.loop(500, function(){
		// console.log(buffer.spiData[0]);
		matrix.drawText(buffer.spiData);
		buffer.moveLeft();
	});

	this.repl.inject({
		matrix: matrix,
		buffer: buffer
	});

});