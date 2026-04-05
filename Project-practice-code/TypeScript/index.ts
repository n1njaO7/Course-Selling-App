// let n : string ;
// n='Pratibha';
// console.log(n);

interface People {
    name: string,
    age : number,
    greet : ()=>string
}

let person : People ={
    name : "Ashmit",
    age: 23,
    greet : ()=>{
        return "hi"
    }  
}

let greeting = person.greet();
console.log(greeting);
