interface Person {
    name : string ;
    age : number;
    address : Address
}

let user:Person = {
    name : "Ashmit Srivastava",
    age : 24,
    address : {
        city : "Basti",
        country : "India",
        pincode : 272001
    }
}

function isLegal (user:Person):boolean{
    if(user.age>18){
        return true
        
    }
    else{
        return false
        
    }
}

if(isLegal(user)){
    console.log("Is leggal");
    
}else{
    console.log("Illegal");
    
}

//For making a thing opttion in interface we use "?:"

interface Person2 {
    name : string ;
    age : number;
    address ?: Address;
}

let user2:Person2 = {
    name : "Ashmit Srivastava",
    age : 25
}

// interface inside interface or we can say interface uses interface

interface Address{
    city : string;
    country : string;
    pincode: number;
}// now on previos interface we will use this 

//function in interface

interface perFun{
    name:string;
    city:string;
    phone:number;
    greeting:()=>string;// Or greeting (): string;
    greeting2 (): number;
}

let person:perFun = {
    name : "Ashmit",
    city : "Basti",
    phone: 7985009614,
    greeting :()=>{
        return "hi" //but the problem here is we can use (return "hi" + this.name) therefore we have to use classes
    },
    greeting2:()=>{
        return 1
    }
}

// implementing interface in class

interface User {
    name : string;
    age: number;
    greeting (): string;
}

class Abc implements User{
    constructor(
        public name : string,
        public age : number 
    ){}
    greeting(): string {
        if(18>this.age){
            return "hi big bro " + this.name
        }
        else{
            return "hi bro " + this.age
        }
    }
}

const m = new Abc("Ashmit",24)
console.log(m);
console.log(m.name)
console.log(m.age)
console.log(m.greeting)



