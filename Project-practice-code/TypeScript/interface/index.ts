interface Person {
    name : string ;
    age : number;
    address : {
        city : string;
        country : string;
        pincode : number;
    }
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
    address ?: {
        city : string;
        country : string;
        pincode : number;
    }
}

let user2:Person2 = {
    name : "Ashmit Srivastava",
    age : 25
}