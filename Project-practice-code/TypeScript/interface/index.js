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
//# sourceMappingURL=index.js.map