function name(firstName:string){
    console.log("Hello "+firstName)
}
name("Ashmit");

function sum(a:number,b:number){
    return a+b;
}
let ans = sum(4,5);
console.log(ans);

function isLeggal(age:number):boolean{
    if(age>=18){
        return true
    }else{
        return false
    }
}
console.log("Am i eligible : "+isLeggal(50));
