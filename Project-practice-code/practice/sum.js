function sum(a,b){
    return a+b
}
let add1 = sum(45,5)
let add2 = sum("45","5")
console.log(add1)
console.log(add2)

function canVote(age){
    if(age>=18){
        return true
    }
    else{
        return false
    }
}
console.log(canVote(22))
console.log(canVote(17))
