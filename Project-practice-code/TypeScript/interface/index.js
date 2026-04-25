"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let user = {
    name: "Ashmit Srivastava",
    age: 24,
    address: {
        city: "Basti",
        country: "India",
        pincode: 272001
    }
};
function isLegal(user) {
    if (user.age > 18) {
        return true;
    }
    else {
        return false;
    }
}
if (isLegal(user)) {
    console.log("Is leggal");
}
else {
    console.log("Illegal");
}
let user2 = {
    name: "Ashmit Srivastava",
    age: 25
};
let person = {
    name: "Ashmit",
    city: "Basti",
    phone: 7985009614,
    greeting: () => {
        return "hi"; //but the problem here is we can use (return "hi" + this.name) therefore we have to use classes
    },
    greeting2: () => {
        return 1;
    }
};
class Abc {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greeting() {
        if (18 < this.age) {
            return "hi big bro " + this.name;
        }
        else {
            return "hi bro " + this.age;
        }
    }
}
const m = new Abc("Ashmit", 24);
console.log(m);
console.log(m.name);
console.log(m.age);
console.log(m.greeting);
console.log(m.greeting());
//# sourceMappingURL=index.js.map