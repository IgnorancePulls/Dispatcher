var testObj = {};


var shouldMixinDispatcherMethodsOnGivenObject = function(){
	testObj = {};
	EventDispatcher.mixin(testObj);
	assert(testObj.addEventListener != null, 'add event listener not mixed in')
	assert(testObj.dispatchEvent != null, 'dispatch event not mixed in')
	assert(testObj.removeEventListener != null, 'remove event listener not mixed in')
    assert(testObj.hasListenerFor != null, 'hasListenerFor not mixed in')
    assert(testObj.hasCallbackFor != null, 'hasCallbackFor not mixed in')

    console.log('shouldMixinDispatcherMethodsOnGivenObject: success')
}

var shouldAddEventListenerToInternalMap = function(){
	testObj = {};
	var testFunction = function(){ console.log('a test function')}; 
	EventDispatcher.mixin(testObj);
    testObj.addEventListener('test', testFunction);
    assert(testObj.hasListenerFor('test'), 'Test event not being listened for.')
    assert(testObj.hasCallbackFor('test', testFunction), 'Test event not associated with callback')
	console.log('shouldAddEventListenerToInternalMap: success')
}

var shouldAllowMultipleEventListenersToBeAddedForOneEvent = function(){
	testObj = {};
	var testFunction = function(){ console.log('a test function')}; 
	var testFunction2 = function(){ console.log('a second test function')}; 
	EventDispatcher.mixin(testObj);
    testObj.addEventListener('test', testFunction);
    testObj.addEventListener('test', testFunction2);
    assert(testObj.hasListenerFor('test'), 'Test event not being listened for.')
    assert(testObj.hasCallbackFor('test', testFunction), 'Test event not associated with callback')
    assert(testObj.hasCallbackFor('test', testFunction2), 'Test event not associated with second callback')
	console.log('shouldAllowMultipleEventListenersToBeAddedForOneEvent: success')
}

var shouldCallRegisteredCallbacksWhenEventFired = function(){
	testObj = {};
	var success1 = false; 
	var success2 = false; 
	var testFunction = function(){ success1= true; }; 
	var testFunction2 = function(){ success2= true}; 
	EventDispatcher.mixin(testObj);
	testObj.addEventListener('test', testFunction); 
	testObj.addEventListener('test', testFunction2); 
	testObj.dispatchEvent('test');
	assert(success1 && success2,'both callbacks made for test event')
	console.log('shouldCallRegisteredCallbacksWhenEventFired: success')
	
}

var shouldNotCallRegisteredCallbackIfRemoved = function(){
	testObj = {};
	var success1 = false; 
	var success2 = false; 
	var testFunction = function(){ success1= true; }; 
	var testFunction2 = function(){ throw new Error('I should not be called')}; 
	EventDispatcher.mixin(testObj);
	testObj.addEventListener('test', testFunction); 
	testObj.addEventListener('test', testFunction2); 
	testObj.removeEventListener('test',testFunction2);
	testObj.dispatchEvent('test');
	assert(success1,'callback made for first test event')
    assert(!success2, 'callback not made for second test event')
	console.log('shouldNotCallRegisteredCallbackIfRemoved: success')
}


var shouldReturnFalseHasListenerForIfMethodsNotAdded = function () {
    testObj = {};
    var scope = {
        executeSuccess: true
    }

    var testFunction = function () {
        if (this.executeSuccess) {
            success1 = true;
        }
        ;
    }

    EventDispatcher.mixin(testObj);
    testObj.addEventListener('test', testFunction, scope);
    testObj.dispatchEvent('test');
    assert(!testObj.hasListenerFor("test2"), 'should be no event registered for test2 event')
    console.log('shouldReturnFalseHasListenerForIfMethodsNotAdded: success')

}

var shouldReturnFalseHasCallBackForIfMethodsNotAdded = function () {
    testObj = {};
    var scope = {
        executeSuccess: true
    }

    var testFunction = function () {
        if (this.executeSuccess) {
            success1 = true;
        }
        ;
    }

    EventDispatcher.mixin(testObj);
    testObj.addEventListener('test', testFunction, scope);
    testObj.dispatchEvent('test');
    assert(testObj.hasCallbackFor("test", testFunction), 'should have callback registered for test event')
    assert(!testObj.hasCallbackFor("test", function () {
    }), 'should have no callback')
    console.log('shouldReturnFalseHasCallBackForIfMethodsNotAdded: success')

}



var shouldAllowCallbacksToBeExecutedInAGivenScope = function(){
	testObj = {};
	var scope = {
			executeSuccess: true 
	}
	var success1 = false; 
	var testFunction = function(){ 
		if(this.executeSuccess){
			success1= true; 
		}; 
	}
	EventDispatcher.mixin(testObj);
	testObj.addEventListener('test', testFunction,scope); 
	testObj.dispatchEvent('test');
	assert(success1,'scope not correctly set for callback')
	console.log('shouldAllowCallbacksToBeExecutedInAGivenScope: success')
	
}

var runAllTests = function(){
	shouldMixinDispatcherMethodsOnGivenObject();
	shouldAddEventListenerToInternalMap(); 
	shouldAllowMultipleEventListenersToBeAddedForOneEvent();
	shouldCallRegisteredCallbacksWhenEventFired();
	shouldNotCallRegisteredCallbackIfRemoved();
    shouldReturnFalseHasListenerForIfMethodsNotAdded();
    shouldReturnFalseHasCallBackForIfMethodsNotAdded();
	shouldAllowCallbacksToBeExecutedInAGivenScope();
	
}
runAllTests();
