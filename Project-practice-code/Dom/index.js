const inputEl = document.querySelector("input");
function AddTodo(){
   const value = inputEl.value;
   const childElement = document.createElement("div");
   childElement.id= "todo" ;
   childElement.innerHTML=`
                            <li><h4>${value}</h4></li>
                            <button onClick="deleteTodo()">Delete</button>
                           `;
   const parentElement = document.getElementById("parentNode");
   parentElement.appendChild(childElement);
   inputEl.value = "" ;

}

function deleteTodo(){
    const element = document.getElementById("todo");
    element.parentNode.removeChild(element);
}