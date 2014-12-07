module("About Functions And Closure (topics/about_functions_and_closure.js)");

test("simple closure", function() {
    var result = "a";
    function changeResult() {
        result = "b";
    };
    changeResult();
    ok(__ === result, 'what is the value of result?');
});

test("module pattern", function() {
    var foo = (function CoolModule() {
        var something = "cool";
        var another = [1, 2, 3];

        function doSomething() {
            return something;
        }

        function doAnother() {
            return another.join( " ! " );
        }

        return {
            doSomething: doSomething,
            doAnother: doAnother
        };
    })();

    ok(__ === defined(something), 'is something available in this scope?');
    ok(__ === defined(another), 'is something available in this scope?');
    ok(__ === foo.doSomething(), 'what is the value returned by doSomething?');
    ok(__ === foo.doAnother(), 'what is the value returned by doAnother?');
});

asyncTest("closure with async functions", function(assert) {
    var sum = 0;
    for (var i=1; i<=5; i++) {
        setTimeout( function timer(){
            sum += i;
        }, i*5 );
    }

    setTimeout( function timer(){
        ok(__ === sum, 'what is the value of sum?');
        start();
    }, 26 );
});

asyncTest("closure at for loop with explicit assignment", function(assert) {
    var sum = 0;
    for (var i=1; i<=5; i++) {
        var j = i;
        setTimeout( function timer(){
            sum += j;
        }, i*5 );
    }

    setTimeout( function timer(){
        ok(__ === sum, 'what is the value of sum?');
        start();
    }, 26 );
});

asyncTest("IIFE",function(){
    var sum = 0;
    for (var i=1; i<=5; i++) {
        (function(){
            var j = i;
            setTimeout( function timer(){
                sum += j;
            }, j*5 );
        })();
    }

    setTimeout( function timer(){
        ok(__ === sum, 'what is the value of sum?');
        start();
    }, 26 );
});

test("passing values on IIFE",function(){
    var sum = 0;
    for (var i=1; i<=5; i++) {
        (function(j){
            setTimeout( function timer(){
                sum += j;
            }, j*5 );
        })( i );
    }

    setTimeout( function timer(){
        ok(__ === sum, 'what is the value of sum?');
        start();
    }, 26 );
});

