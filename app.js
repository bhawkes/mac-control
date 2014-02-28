var mc = require("mac-control");

// press a on the Mac running node
mc.keyPress("a");

// press q
mc.keyPress(12);

// holds shift, then presses b+c, effectively typing BC, then releases shift
mc.keyHold("shift");

    mc.keyPress(["b","c"]);

mc.keyRelease("shift");