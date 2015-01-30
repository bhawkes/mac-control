var addon = require('./build/Release/addon');
var mc = {};
module.exports = mc;
// private variables

var events = {}

var modifiers = {
        shift:false,
        command:false,
        option:false,
        control:false,
        fn:false
}

// module functions

mc.keyPress = function(arg){
    var type = whichType(arg)
    
    if(type == "number"){ 
        
        var kC = numToKeyCode(arg);
        
        keyHoldEvent(kC);
        keyReleaseEvent(kC);
        
    } else if(type == "string"){
        
        var kC = stringToKeyCode(arg);
        
        keyHoldEvent(kC);
        keyReleaseEvent(kC);
        
    } else if(type == "array"){
        
        // press all in array, then release all in array
        
        var tempKeys = [];
        
        // press all in array
        for(var i=0;i<arg.length;i++){
            
            if(whichType(arg[i]) == "number"){
                
                var kC = numToKeyCode(arg[i]);
                
                tempKeys.push(kC);
                
                keyHoldEvent(kC);
    
            } else if(whichType(arg[i]) == "string"){
                
                var kC = stringToKeyCode(arg[i]);
                
                tempKeys.push(kC);
                
                keyHoldEvent(kC);
                
            } else {
                
                return false;
                
            }
            
        }
        
        // now release all in tempKeys array
        for(var j=0;j<arg.length;j++){
             keyReleaseEvent(tempKeys[j]);            
        }
      
        
    } else {
        
        return false;
        
    }
}

mc.keyHold = function(arg){
    var type = whichType(arg)
    
    if(type == "number"){ 
        
        var kC = numToKeyCode(arg);
        
        keyHoldEvent(kC);
        
    } else if(type == "string"){
        
        var kC = stringToKeyCode(arg);
        
        keyHoldEvent(kC);
        
    } else if(type == "array"){
        
        // press all in array
        for(var i=0;i<arg.length;i++){
            
            if(whichType(arg[i]) == "number"){
                
                var kC = numToKeyCode(arg[i]);
                                
                keyHoldEvent(kC);
    
            } else if(whichType(arg[i]) == "string"){
                
                var kC = stringToKeyCode(arg[i]);
                                
                keyHoldEvent(kC);
                
            } else {
                
                return false;
                
            }
            
        }
      
        
    } else {
        
        return false;
        
    }
}

mc.keyRelease = function(arg){
    var type = whichType(arg)
    
    if(type == "number"){ 
        
        var kC = numToKeyCode(arg);
        
        keyReleaseEvent(kC);
        
    } else if(type == "string"){
        
        var kC = stringToKeyCode(arg);
        
        keyReleaseEvent(kC);
        
    } else if(type == "array"){
        
        // release all in array
        for(var i=0;i<arg.length;i++){
            
            if(whichType(arg[i]) == "number"){
                
                var kC = numToKeyCode(arg[i]);
                                
                keyReleaseEvent(kC);
    
            } else if(whichType(arg[i]) == "string"){
                
                var kC = stringToKeyCode(arg[i]);
                
                keyReleaseEvent(kC);
                
            } else {
                
                return false;
                
            }
            
        }
      
    } else {
        
        return false;
        
    }
}


mc.combineKeys=function(arrayofkeys)
{
    var timeout=500;
    arrayofkeys.push("end");
    arrayofkeys.forEach(function(key){
        if(key!="end")
        {
            setTimeout(function(){
             mc.keyHold(key)   
            },500);
        }
        else
        {
          arrayofkeys.forEach(function(key){
            setTimeout(function(){
                mc.keyRelease(key);
            },500);
          });
        }
    });
}

mc.CapsText=function(string)
{
    var timeout=200;
    var chars=string.split("");
    /*----method-1-----*/
    chars.push("end");
    mc.keyHold("shift")
    chars.forEach(function(key){
        setTimeout(function(){
            if(key!="end")
            {
            mc.keyHold(key);
            }
            else
            {
                mc.keyRelease("shift");
            }
        },timeout);
    });

}

mc.Navigate=function(direction)
{
    mc.keyPress(stringToKeyCode(direction));
}



// private functions

function whichType(arg){
    
    if(typeof arg ===  "number"){
        
        return "number";
        
    } else if(typeof arg ==  "string"){
        
        return "string";
        
    } else if(arg instanceof Array){
        
        return "array";
        
    } else {
        
        return false;
    }
}

function numToKeyCode(arg){
    
    arg = parseInt(arg);
    
    if(arg > 0 && arg < 200){
        
        return arg;
        
    } else {
        
        return 0;
        
    }
    
}

function stringToKeyCode(arg){
    
    switch (arg){
        case "a": case "A":   return 0;   
        case "b": case "B":   return 11;  
        case "c": case "C":   return 8;    
        case "d": case "D":   return 2;    
        case "e": case "E":   return 14;   
        case "f": case "F":   return 3;    
        case "g": case "G":   return 5;    
        case "h": case "H":   return 4;    
        case "i": case "I":   return 34;   
        case "j": case "J":   return 38;   
        case "k": case "K":   return 40;  
        case "l": case "L":   return 37;  
        case "m": case "M":   return 46;   
        case "n": case "N":   return 45;   
        case "o": case "O":   return 31;   
        case "p": case "P":   return 35;   
        case "q": case "Q":   return 12;   
        case "r": case "R":   return 15;   
        case "s": case "S":   return 1;    
        case "t": case "T":   return 17;   
        case "u": case "U":   return 32;  
        case "v": case "V":   return 9;   
        case "w": case "W":   return 13;  
        case "x": case "X":   return 7;    
        case "y": case "Y":   return 16;   
        case "z": case "Z":   return 6;        
            
        case "1":   return 18;    
        case "2":   return 19;    
        case "3":   return 20;    
        case "4":   return 21;    
        case "5":   return 23;    
        case "6":   return 22;    
        case "7":   return 26;   
        case "8":   return 28;   
        case "9":   return 25;    
        case "0":   return 29;

        case ".":   return 47;
        case ",":   return 43;
        case "[":   return 33;
        case "]":   return 30;
        case ",":   return 43;
        case "-":   return 27;
        case "=":   return 24;
        case "'":   return 39;
        case ";":   return 41;
        case "\\":  return 42;
        case "/":   return 44;
        case "`":   return 50;

            
        case "tab": return 48;    
            
        case "command": case "cmd":     return 55;   
            
        case "control": case "ctrl":    return 59;   
            
        case "option":  case "opt": case "alt": return 58;   
        
        case "enter":   case "return":  return 36;  
            
        case "delete":  case "del":  return 51; 
            
        case "function": case "fn": return 63;   
            
        case "backspace": case "bksp": return 51;  
            
        case "space": case "sp": case " ": return 49;    
            
        case "escape": case "esc":  return 53;    
            
        case "capslock": case "caps":   return 57;    
            
        case "up":          return 126;   
        case "down":        return 125;    
        case "left":        return 123;    
        case "right":       return 124;    
            
        case "shift":       return 60;   // 56 or 60

        case ".": return '.';
   
        default:    return 0;   
    }        
    
}

function keyHoldEvent(kC){
         if(kC == 60){
            modifiers.shift = true;
        } else if(kC == 55){
            modifiers.command = true;
        } else if(kC == 58){
            modifiers.control = true;
        } else if(kC == 59){
            modifiers.option = true;
        } else if(kC == 63){
            modifiers.fn = true;
        }
    
        if(events[kC]){
            // if the system thinks an key event is already happening
            console.log('event already exists');
            events[kC].keyRelease();
            delete events[kC];
        }
         
        events[kC] = {
            keyCode : null,
            modifiers:{
                shift:false,
                command:false,
                option:false,
                control:false,
                fn:false
            },
            keyPress: function(){
                sendKeyPress(this.keyCode,this.modifiers);
            },
            keyRelease:function(){
                sendKeyRelease(this.keyCode,this.modifiers);
            }
        }; 
    
        events[kC].keyCode =  kC;
        
        // inherit global modifiers
        events[kC].modifiers =  modifiers;
        
        // quick press
        events[kC].keyPress();
    
    
}

function keyReleaseEvent(kC){
    
        // modifiers when released set the flag to false
        if(kC == 60){
            events[kC].modifiers.shift = false;
            modifiers.shift = false;
        } else if(kC == 55){
            events[kC].modifiers.command = false;
            modifiers.command = false;
        } else if(kC == 58){
            events[kC].modifiers.control = false;
            modifiers.control = false;
        } else if(kC == 59){
            events[kC].modifiers.option = false;
            modifiers.option = false;
        } else if(kC == 63){
            events[kC].modifiers.fn = false;
            modifiers.fn= false;
        }
    
        if(events[kC]){
            events[kC].keyRelease();
        } // else, event isn't there
        
        //then delete the event
        delete events[kC];
}


function sendKeyPress(keycode,mods){
    
    // shift, command, control, option, fn
    var modify = [false,false,false,false,false];
    
    if(mods.shift) modify[0] = true;
    if(mods.command) modify[1] = true;
    if(mods.control) modify[2] = true;
    if(mods.option) modify[3] = true;
    if(mods.fn) modify[4] = true;
    
    addon.press(keycode,modify[0],modify[1],modify[2],modify[3],modify[4]);
    
}

function sendKeyRelease(keycode,mods){
    
    // shift, command, control, option, fn
    var modify = [false,false,false,false,false];
    
    if(mods.shift) modify[0] = true;
    if(mods.command) modify[1] = true;
    if(mods.control) modify[2] = true;
    if(mods.option) modify[3] = true;
    if(mods.fn) modify[4] = true;
    
    addon.release(keycode,modify[0],modify[1],modify[2],modify[3],modify[4]);
    
} 

