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
        return "hi";
    },
    greeting2: () => {
        return 1;
    }
};
//# sourceMappingURL=index.js.map