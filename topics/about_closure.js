/* jshint eqeqeq: false, unused: false, eqnull: true, undef: false, latedef: false  */
/* jshint -W083 */
module("About Closure (topics/about_closure.js)");

test("simple closure", function() {
    function foo () {
        var result = "a";
        function changeResult() {
            return result;
        }

        ok(__ === result, 'result is available here');

        return changeResult;
    }

    var changeResult = foo();

    ok(__ === defined(result), 'its not in this scope');

    var closuredResult = changeResult();

    ok(__ === closuredResult, 'but its not gone because of the closure');
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
        setTimeout( function timer1(){
            sum += i;
        }, i*5 );
    }

    setTimeout( function timer2(){
        ok(__ === sum, 'what is the value of sum?');
        start();
    }, 26 );
});

asyncTest("closure at for loop with explicit assignment", function(assert) {
    var sum = 0;
    for (var i=1; i<=5; i++) {
        var j = i;
        setTimeout( function timer1(){
            sum += j;
        }, i*5 );
    }

    setTimeout( function timer2(){
        ok(__ === sum, 'what is the value of sum?');
        start();
    }, 26 );
});

asyncTest("IIFE",function(){
    var sum = 0;
    for (var i=1; i<=5; i++) {
        (function(){
            var j = i;
            setTimeout( function timer1(){
                sum += j;
            }, j*5 );
        })();
    }

    setTimeout( function timer2(){
        ok(__ === sum, 'what is the value of sum?');
        start();
    }, 26 );
});

asyncTest("passing values on IIFE",function(){
    var sum = 0;
    for (var i=1; i<=5; i++) {
        (function(j){
            setTimeout( function timer1(){
                sum += j;
            }, j*5 );
        })( i );
    }

    setTimeout( function timer2(){
        ok(__ === sum, 'what is the value of sum?');
        start();
    }, 26 );
});

