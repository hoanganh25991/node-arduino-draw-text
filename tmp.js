var five = require("johnny-five");
var board = new five.Board();

var buildSpiData = require('./matrix-on-txt');

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
	var eightSpiData = buildSpiData('ma no', matrixFont);

	eightSpiData.forEach(function(spiData){
		// var spiData =   [ 21, 7, 15, 7, 0, 7, 17, 7 ];

		matrix.io.digitalWrite(matrix.pins.cs, matrix.io.LOW);

		for (var j = spiData.length; j > 0; j--) {
			matrix.board.shiftOut(matrix.pins.data, matrix.pins.clock, spiData[j - 1]);
		}

		matrix.io.digitalWrite(matrix.pins.cs, matrix.io.HIGH);
	});

	this.repl.inject({
		matrix: matrix
	});
});