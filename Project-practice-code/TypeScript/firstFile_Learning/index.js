"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function name(firstName) {
    console.log("Hello " + firstName);
}
name("Ashmit");
function sum(a, b) {
    return a + b;
}
let ans = sum(4, 5);
console.log(ans);
function isLeggal(age) {
    if (age >= 18) {
        return true;
    }
    else {
        return false;
    }
}
console.log("Am i eligible : " + isLeggal(50));
function delayedCall(fn) {
    setTimeout(fn, 1000);
}
delayedCall(() => {
    console.log("hi there");
});
//# sourceMappingURL=index.js.map