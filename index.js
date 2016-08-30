var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
    var led = new five.Led(13);
    led.on();


    // Create an Led on pin 13 and strobe it on/off
    // Optionall set the speed; defaults to 100ms
    // led.strobe();


    this.on("exit", function() {
        led.off();
    });

});