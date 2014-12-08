module("About Scope (topics/about_scope.js)");

variable1 = 77;

test("global variables", function() {
    // defined returns true if the variable is defined in the scope, else false
    ok(__ === defined(variable1), 'is variable1 defined in this scope?');
    ok(__ === defined(window.variable1), 'is variable1 defined on the window object?');
});

test("function scope", function() {
    var outerVariable = "outer";

    (function() {
        var innerVariable = "inner";
        ok(__ === defined(outerVariable), 'is outerVariable defined in this scope?');
        ok(__ === defined(innerVariable), 'is innerVariable defined in this scope?');
    })();

    ok(__ === defined(outerVariable), 'is outerVariable defined in this scope?');
    ok(__ === defined(innerVariable), 'is innerVariable defined in this scope?');
});

test("block scope", function() {
    var outerVariable = "outer";

    if (outerVariable) {
        var innerVariable = "inner";
        ok(__ === defined(outerVariable), 'is outerVariable defined in this scope?');
        ok(__ === defined(innerVariable), 'is innerVariable defined in this scope?');
    }

    ok(__ === defined(outerVariable), 'is outerVariable defined in this scope?');
    ok(__ === defined(innerVariable), 'is innerVariable defined in this scope?');
});

test("for loop scope", function() {
    for (var i=0; i<10; i++) {
        // doing something
    }

    ok(__ === defined(i), 'is i defined in this scope?');
});

test("functions calling functions", function() {
    function foo() {
        ok(__ === a, 'what is the value of a?');
    }

    function bar() {
        var a = 3;
        foo();
    }

    var a = 2;

    bar();
});

test("functions inside functions calling functions inside for loops", function () {
    var res = 0;

    function foo() {
        function bar(a) {
            i = 10;
            return a + i;
        }

        for (var i=0; i<10; i++) {
            res += bar( i * 2 );
        }
    }
    foo();

    ok(__ === res, 'what is the final value of res?');
});

test("Outside scope", function () {
    var res = 0;

    function foo() {
        function bar(a) {
            b = 1;
            return a + i;
        }

        for (var i=0; i<10; i++) {
            res += bar( i * 2 );
        }
    }
    foo();

    ok(__ === defined(a), 'is a defined in this scope?');
    ok(__ === defined(b), 'is b defined in this scope?');
    ok(__ === defined(c), 'is c defined in this scope?');
    ok(__ === defined(foo), 'is foo defined in this scope?');
    ok(__ === defined(bar), 'is bar defined in this scope?');
});

test("For loops again", function () {
    var res = 0;

    function foo() {
        function bar(res) {
            res++;
            return 1;
        }

        for (var i=0; i<10; i++) {
            res += bar(i);
        }
    }
    foo();
    res++;

    ok(__ === res, 'what is the final value of res?');
});

test("Try catch", function () {
    try{
        throw 2
    } catch(a) {
        ok(__ === a, 'whats the value of a?');
    }
    ok(__ === defined(a), 'is a defined in this scope?');
});

test("eval on strict", function () {
    function foo(str) {
        "use strict";
        eval( str );
        ok(__ === defined(a), 'is a defined in this scope?');
    }

    foo( "var a = 2" );
});

test("why you shouldn't use with", function () {
    function foo(obj) {
        with (obj) {
            a = 2;
        }
    }

    var o1 = {
        a: 3
    };

    var o2 = {
        b: 3
    };

    foo( o1 );
    ok(__ === o1.a, 'what is o1.a?');
    ok(__ === defined(a), 'is a defined in global scope?');

    foo( o2 );
    ok(__ === o2.a, 'what is o2.a?');
    ok(__ === defined(a), 'is a defined in global scope?');
});
