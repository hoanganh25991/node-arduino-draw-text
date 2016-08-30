var five = require("johnny-five");
var board = new five.Board({port: 'COM7'});

// var buildSpiData = require('./matrix-on-txt');
var buildSpiData = require('./matrix-spi-data');

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

	var matrixFont = five.LedControl.MATRIX_CHARS;

	/** @var array eightSpiData */
	var eightSpiData = buildSpiData('mano', matrixFont);

	eightSpiData.forEach(function(spiData){
		matrix.io.digitalWrite(matrix.pins.cs, matrix.io.LOW);

		for(var j = 8; j > 0; j--){
			for(var i = 0; i < 8; i++){
				matrix.io.digitalWrite(3, 0);
				matrix.io.digitalWrite(2, spiData[8 * (j - 1) + i]);
				matrix.io.digitalWrite(3, 1);
			}
		}

		// for(var i = spiData.length; i > 0; i--){
		// 	matrix.io.digitalWrite(3, 0);
		// 	matrix.io.digitalWrite(2, i%2);
		// 	matrix.io.digitalWrite(3, 1);
		// }

		matrix.io.digitalWrite(matrix.pins.cs, matrix.io.HIGH);
	});

	this.repl.inject({
		matrix: matrix
	});
});