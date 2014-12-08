/* jshint eqeqeq: false, unused: false, eqnull: true, undef: false, latedef: false  */
/* jshint -W019 */
/* jshint -W004 */
/* jshint -W083 */
module("About Hoisting(topics/about_hoisting.js)");

test("basic hoisting value", function() {
    foo = 2;

    ok(foo === __, 'what value does foo have?');

    var foo = 5;
});

test("basic hoisting", function() {
    ok(foo === __, 'what value does foo have?');

    var foo = 5;
});

var barryglobal = 2;
test("basic hoisting with globals", function() {
    ok(barryglobal === __, 'what value does bar have?');

    barryglobal = 5;
});


test("function hoisting", function() {
    ok(typeof foo === __, 'is foo initialized as function?');

    function foo() { return 5;}
});

test("function hoisting with expression", function() {
    ok(typeof foo === __, 'is foo initialized as function?');

    var foo = function() { return 5;};
});

test("function hoisting with a named variable", function() {
    ok(typeof foo === __, 'is foo a number or a function?');

    var foo = 5;
    function foo() { return 5;}
});


test("advanced hoisting", function() {
    ok(foo() === __, 'what does foo produce?');

    var foo = 1;
    foo = function() { return 2;};
    function foo() { return 3;}
});

test("advanced hoisting", function() {
    var foo = 1;
    foo = function() { return 2;};

    ok(foo() === __, 'what does foo produce?');

    function foo() { return 3;}
});

test("advanced hoisting with loops", function() {
    var txt = ["a","b","c"];
    for (var i = 0; i < 3; ++i ) { 
        result = [];
        result.push(txt[i]);
    }
    var result = [];

    ok(result.length === __, "how many elements are in result?");
});
