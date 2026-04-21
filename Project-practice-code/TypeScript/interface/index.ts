interface Person {
    name : string ;
    age : number;
    address : {
        city : string;
        country : string;
        pincode : number;
    }
}

let user = {
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