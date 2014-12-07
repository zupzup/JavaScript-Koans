module("About this (topics/about_this.js)");

test("'this' inside a method", function () {
	var person = {
		name: 'bob',
		intro: function () {
			return "Hello, my name is " + this.__;
		} 
	};

	ok(person.intro() === "Hello, my name is bob", "If an object has a method can you access properties inside it?");
});

test("'this' on unattached function", function () {
	var person = {
		unattachedName: 'bob',
		intro: function () {
			return "Hello, my name is " + this.unattachedName;
		} 
	};

	var alias = person.intro;
	
	// if the function is not called as an object property 'this' is the global context 
	// (window in a browser). This is an example. Please do not do this in practise.
	window.__ = 'Peter';
	ok(alias() === "Hello, my name is Peter", "What does 'this' refer to when it is not part of an object?");
});

asyncTest("this with setTimeout", function(assert) {
    var name = 'frank';

    var person = {
        name: 'bob',
        intro: function () {
            ok(__ === this.name, "What does 'this' refer?");
            start();
        }
    };

    setTimeout(person.intro, 1 );
});

test("'this' set explicitly", function () {
	var person = {
		name: 'bob',
        intro: function () {
            return "Hello, my name is " + this.name;
        }
	};

	// calling a function with 'call' lets us assign 'this' explicitly
	var message = person.intro.call({__: "Frank"});
	equal(message, "Hello, my name is Frank", "What does 'this' refer to when you use the 'call()' method?");
});

asyncTest("bound this", function(assert) {
    var name = 'frank';

    var person = {
        name: 'bob',
        intro: function () {
            ok(__ === this.name, "What does 'this' refer?");
            start();
        }
    };

    var intro = person.intro.bind(person);

    setTimeout(intro, 1 );
});

test("bound this with explicit call", function(assert) {
    var name = 'frank';

    var person = {
        name: 'bob',
        intro: function () {
            ok(__ === this.name, "What does 'this' refer?");
            start();
        }
    };

    var intro = person.intro.bind(person);

    intro.call({name: 'test'});
});

test("double bound this", function(assert) {
    var name = 'frank';

    var person = {
        name: 'bob',
        intro: function () {
            ok(__ === this.name, "What does 'this' refer?");
        }
    };

    var intro = person.intro.bind(person);

    var doubleBoundIntro = intro.bound({name: 'test'});

    doubleBoundIntro();
});

test("new keyword", function(assert) {
    var name = 'frank';

    function Person (name) {
        this.name = name;
    }

    var person = new Person('bob');

    ok(__ === person.name, "What is the name of the person?");
    ok(__ === name, "Has the name variable changed?");
});

test("overly complicated bind magic",function(){
    function someFunc(a, b, c, d){
        return this + a(b) + c(d);
    }

    var result = someFunc.bind("I", function(b) {
        return this + b; 
    }.bind(" am ", "a"), "hello", function(d) {
        return (this + d).split("").reverse().join("");
    }.bind("dog tpircs"), "avaj ")();

    ok(__ === result, "what is the value of result?");
});
