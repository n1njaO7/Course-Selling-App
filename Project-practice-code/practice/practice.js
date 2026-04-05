const  input = [1,2,3,4,5]
// const newArr =[]
// for(let i=0;i<input.length;i++){
//    // newArr[i] = input[i]*2
//    newArr.push(input[i]*2)
// }
//

// solving using map
// const newArr= input.map(num=>num*2)
 const newArr= input.map(num=>{
    return num*2
 })
// console.log(newArr)
//----------------------------------------
// NOW FILTER Even no from input 

const evenNo = input.filter(num=>{
    return num%2==0
})
console.log(evenNo)





