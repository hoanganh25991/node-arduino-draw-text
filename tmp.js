var five = require("johnny-five");
var board = new five.Board({port: 'COM7'});

// var buildSpiData = require('./matrix-on-txt');
var buildSpiData = require('./matrix-spi-data');

var sleep = require('./sleep');

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

	var drawText = function(txt){
		/** @var array eightSpiData */
		var eightSpiData = buildSpiData(txt, matrixFont);

		// eightSpiData.forEach(function(row, index){
		// 	var row0 = row[0];
		// 	row.splice(0, 1);
		// 	row.push(row0);
		// 	eightSpiData[index] = row;
		// });

		// board.loop(10000, function(){
			matrix.clear();

			// sleep(4000);

			eightSpiData.forEach(function(spiData){
				matrix.io.digitalWrite(matrix.pins.cs, matrix.io.LOW);

				for(var j = 8; j > 0; j--){
					for(var i = 0; i < 8; i++){
						matrix.io.digitalWrite(3, 0);
						matrix.io.digitalWrite(2, spiData[8 * (j - 1) + i]);
						// matrix.io.digitalWrite(2, Math.floor(Math.random() * 2));
						matrix.io.digitalWrite(3, 1);
					}
				}

				matrix.io.digitalWrite(matrix.pins.cs, matrix.io.HIGH);
			});

			// eightSpiData.forEach(function(row){
			// 	var row0 = row[0];
			// 	row.splice(0, 1);
			// 	row.push(row0);
			// });
		// });

		// var update = function(){

		// };
	};

	// update();

	// var refresh = setInterval(update, 1000);

	this.repl.inject({
		drawText: drawText,
		matrix: matrix
	});
});