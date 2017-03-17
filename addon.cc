#include <node.h>
#include <nan.h>
#include <ApplicationServices/ApplicationServices.h>
#include <v8.h>

using namespace v8;

//kCGEventFlagMaskControl
//kCGEventFlagMaskAlternate
//kCGEventFlagMaskCommand
//kCGEventFlagMaskSecondaryFn

NAN_METHOD (Press) {
        
    CGEventRef down = CGEventCreateKeyboardEvent(NULL, (CGKeyCode) args[0]->NumberValue(), true);

    if(args[1]->NumberValue() == 1){
        CGEventSetFlags(down, kCGEventFlagMaskShift);
    }

    CGEventPost(kCGHIDEventTap, down);
    CFRelease(down);

    // return v8::Undefined();
}
 
NAN_METHOD (Release) {
    
    CGEventRef up = CGEventCreateKeyboardEvent(NULL, (CGKeyCode) args[0]->NumberValue(), false);
    
    if(args[1]->NumberValue() == 1){
        CGEventSetFlags(up, kCGEventFlagMaskShift);
    }
    
    CGEventPost(kCGHIDEventTap, up);
    CFRelease(up);

    // return v8::Undefined();
}
 
void init(Handle<Object> target) {
    target->Set(NanNew<String>("press"),
        NanNew<FunctionTemplate>(Press)->GetFunction());
 
    target->Set(NanNew<String>("release"),
        NanNew<FunctionTemplate>(Release)->GetFunction());
}
NODE_MODULE(addon, init)