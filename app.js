var mc = require("mac-control");

// press a on the Mac running node
mc.keyHold("shift");

setTimeout(function(){mc.keyPress("c");}, 500);

setTimeout(function(){mc.keyRelease("shift");}, 1000);