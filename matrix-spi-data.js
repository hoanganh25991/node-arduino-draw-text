var transpose = require('./transpose');

var buildSpiData = function (txt, font){
	//reverse bcs [o][n][a][m]=DC-5v
	var charArr = txt.split('').reverse();

	var dataArr = [];

	charArr.forEach(function(char){
		dataArr.push(font[char]);
		// [
		// 	[8, 9, 10, 11, 12, 13, 14, 15], //a character
		// 	[8, 9, 10, 11, 12, 13, 14, 15], //a character
		// 	[8, 9, 10, 11, 12, 13, 14, 15], //a character
		// 	[8, 9, 10, 11, 12, 13, 14, 15] //a character
		// ]
	});

	dataArr = transpose(dataArr);
	// [
	// 	[8, 8, 8, 8],   //all data for 4 devices in row 1 
	// 					//=> spiData = [8, 1, 8, 1, 8, 1, 8, 1]
	// 	[9 , 9, 9, 9],
	// 	...
	// 	[15, 15, 15, 15]
	// ]

	var eightSpiData = [];

	dataArr.forEach(function(row, index){
		//row = [8, 8, 8, 8]
		var rowOrder = index + 1;
		var spiData = [row[0], rowOrder, row[1], rowOrder, row[2], rowOrder, row[3], rowOrder];
		//spiData [23, rowX, 45, rowX, 65, rowX, 67, rowX], 4 times <=> 4 devices

		//split each val into binary "00001010"
		var tmp = [];
		spiData.forEach(function(rowVal){
			var n = parseInt(rowVal, 10).toString(2);
			n = "00000000".substr(n.length) + n;
			var io = n.split('');
			io.forEach(function(bin, index){
				io[index] = Number(bin);
			});
			tmp = tmp.concat(io);
		});

		eightSpiData.push(tmp);
	});

	// console.log(eightSpiData);

	// dataArr.

	return eightSpiData;
};

module.exports = buildSpiData;