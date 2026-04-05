function promisifiedVersion(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}
function message(){
    console.log("Delay message ")
}
promisifiedVersion(3000).then(message)