window.defined= function (a) {
    window.innerVariable = undefined;
    window.a = undefined;
    window.c = undefined;
    window.foo = undefined;
    window.bar = undefined;
    window.something = undefined;
    window.another = undefined;
    return typeof(a) !== 'undefined';
}