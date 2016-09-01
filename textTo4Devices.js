var textTo4Devices = function(spiData, matrix){
	// matrix.clear();
	// spiData = [123,1,123,1,123,1,123,1];

	matrix.io.digitalWrite(matrix.pins.cs, matrix.io.LOW);

	for (var j = spiData.length; j > 0; j--) {
		matrix.board.shiftOut(matrix.pins.data, matrix.pins.clock, spiData[j - 1]);
	}

	matrix.io.digitalWrite(matrix.pins.cs, matrix.io.HIGH);
};

module.exports = textTo4Devices;
