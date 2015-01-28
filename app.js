var mc = require("mac-control");

// press a on the Mac running node
mouse.keyHold("shift");

setTimeout(function(){mouse.keyPress("c");}, 500);

setTimeout(function(){mouse.keyRelease("shift");}, 1000);