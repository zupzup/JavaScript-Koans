/* jshint eqeqeq: false, unused: true, eqnull: true, undef: false  */
/* jshint -W019 */
module("About Equality (topics/about_equality.js)");

test("equality without type coercion", function() {
    ok(3 === __, 'what is exactly equal to 3?');
});

test("equality with type coercion", function() {
    ok(3 == "__", 'what string is equal to 3, with type coercion?');
});

test("equality with type coercion", function() {
    var undefIsNull; //undefined
    if(undefIsNull == null) {
        undefIsNull = true; 
    }
    equal(__, undefIsNull, 'is undefined equal to null?');
});


test("truthyness of positive numbers", function() {
    var oneIsTruthy = 1 ? true : false;
    equal(__, oneIsTruthy, 'is one truthy?');
});

test("truthyness of negative numbers", function() {
    var negativeOneIsTruthy = -1 ? true : false;
    equal(__, negativeOneIsTruthy, 'is -1 truthy?');
});

test("truthyness of zero", function() {
    var zeroIsTruthy = 0 ? true : false;
    equal(__, zeroIsTruthy, 'is 0 truthy?');
});


test("casting to boolean", function() {
    var castedTrue = !!"false" ? true : false;
    equal(__, castedTrue, 'is this string casted to boolean truthy?');
});

test("arrays of arrays truthyness", function() {
    var isThisTrue = [[]] ? true : false;
    equal(__, isThisTrue, 'is an empty array within an array truthy?');
});

test("NaN equality", function() {
    var isNaNEqualToNaN = NaN === NaN;
    equal(__, isNaNEqualToNaN, 'is an array within an array equal truthy?');
});
