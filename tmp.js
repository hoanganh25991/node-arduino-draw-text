var five = require("johnny-five");
var board = new five.Board();

var charMatrixByColumn = require("./matrix-transform.js");

board.on("ready", function(){

	var matrix = new five.Led.Matrix({
		pins: {
			data: 2,
			clock: 3,
			cs: 4
		}
	});

	matrix.on();

	/*

	 A single Led.Matrix object can control one
	 or more led matrix devices. All methods of
	 Led.Matrix objects expect the target device's
	 index as their first argument. Since this
	 might seem cumbersome when there is only
	 one matrix device, use the `device()` method
	 to create a display device bound to an index.

	 */
	var display = matrix.device(0);
	
	var a = five.LedControl.MATRIX_CHARS;

	function drawCh(ch){
		var tmp = {};

		var b = charMatrixByColumn(ch, a);

		var refresh = setInterval(function(){
			display.clear();
			for(i = 0; i < 8; i++){
				display.column(i, b[i]);
			}

			var b0 = b[0];
			b.splice(0, 1);
			b.push(b0);
			// display.draw();
		}, 500);

		tmp.refresh = refresh;

		return tmp;
	};

	var drawCh = drawCh('c');
	
	// console.log(a['b']);
	this.repl.inject({
		display: matrix.device(0),
		a: a,
		charMatrixByColumn: charMatrixByColumn
	});
});