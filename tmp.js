var five = require("johnny-five");
var board = new five.Board({port: 'COM7'});

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
	var eightSpiData = buildSpiData('onam', matrixFont);

	eightSpiData.forEach(function(spiData){
		// var spiData =   [ 21, row7, 15, row7, 0, row7, 17, row7 ];        

		matrix.io.digitalWrite(matrix.pins.cs, matrix.io.LOW);

		console.log('old: ', !!(spiData[6-1] & (1 << (7 - 4))) | 0);
		var nx = parseInt(spiData[6-1], 10).toString(2);
		nx = "00000000".substr(nx.length) + nx;
		var iox = nx.split('');
		console.log('new:', iox[4]);

		for (var j = spiData.length; j > 0; j--) {
		// for (var j = 0; j < spiData.length; j++) {
			var n = parseInt(spiData[j-1], 10).toString(2);
			n = "00000000".substr(n.length) + n;
			var io = n.split('');
			io.forEach(function(bin, index){
				io[index] = Number(bin);
			});

			for(var i = 0; i < 8; i++){
				matrix.io.digitalWrite(3, 0);
				matrix.io.digitalWrite(2, io[i]);
				// matrix.io.digitalWrite(2, "1");
				matrix.io.digitalWrite(3, 1);
			}
		}

		matrix.io.digitalWrite(matrix.pins.cs, matrix.io.HIGH);
	});

	// matrix.shiftOut()

	this.repl.inject({
		matrix: matrix
	});
});