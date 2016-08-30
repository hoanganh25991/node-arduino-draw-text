var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

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

  this.repl.inject({
    display: matrix.device(0)
  });
});