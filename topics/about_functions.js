/* jshint eqeqeq: false, unused: false, eqnull: true, undef: false, latedef: false  */
/* jshint -W093 */
module("About Functions (topics/about_functions.js)");

test("defining named functions", function() {
    function fun() {}
    ok(fun.name === __, 'what is the name of the function?');
});

test("defining anonymous functions", function() {
    var fun = function() {};
    ok(fun.name === __, 'what is the name of the function?');
});

test("first class objects", function() {
    var fun = function() {
        return function returnFunc() {};
    };
    ok(typeof fun() === __, 'what is the type of the functions return value?');
});


test("using call to invoke function",function(){
    var invokee = function( message ){
        return this + message;
    };
    var result = invokee.call("I am this!", "Where did it come from?");

    ok(__ === result, "what will the value of result?");
});

test("using apply to invoke function",function(){
    var invokee = function( message1, message2 ){
        return this + message1 + message2;    
    };
    var result = invokee.apply("I am this!", ["I am arg1","I am arg2"]);

    ok(__ === result, "what will the value of result?");
});

test("function arguments",function(){
    function someFunc(a, b){
        return a + b;
    }

    ok(someFunc(0, 1, 2, 3, 4) === __, "what happens if we use more arguments than the function expects?");
});


test("arguments array", function() {
    var add = function() {
        var total = 0;
        for(var i = 0; i < arguments.length; i++) {
            // complete the implementation of this method so that it returns the sum of its arguments
            // __
        }
        // __
    };

    equal(15, add(1,2,3,4,5), "add 1,2,3,4,5");
    equal(9, add(4,7,-2), "add 4,7,-2");
});

test("function properties",function(){
    function someFunc(a){
        if(!someFunc.cache) { someFunc.cache = {}; }
        if(someFunc.cache[a] != null) {
            return someFunc.cache[a];
        }
        var result = a * 5;
        return someFunc.cache[a] = result;
    }
    var result = someFunc(2);
    someFunc.cache[3] = 5;
    result = someFunc(3);
    ok(__ === result, "What is the value of result after consecutive calls?");
});


test("complex example with functions",function(){
    function someFunc(a, b, c, d, e, f){
        return a(b, c) + d(e, f);
    }

    var result = someFunc(function(a, b) {
        return a + b;
    }, "I", " am a ", function(a, b) {
        return (a + b).split("").reverse().join("");
    }, "dog tpircs", "avaj");

    ok(__ === result, "what is the value of result?");
});

