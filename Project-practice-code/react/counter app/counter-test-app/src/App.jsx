import {  useEffect, useState } from "react";

function App(){

  const [countVisible , setCountVisible] = useState(true);

  useEffect(function(){
      setInterval(function(){
        setCountVisible(c => !c)
      },5000)
   
  },[])

  return (
  <div>
    <b>
      Hi There
    </b>
    {countVisible && <Counter/>}
  </div>
  )
}

function Counter(){
  const [count , setCount] = useState(0)

  useEffect(function(){
    console.log("On Mount") //On Mounting
    let clock = setInterval(function(){
    console.log("From Inside SetInetrval")
    setCount((c)=>c+1)
    },1000)
    
    // for unmounting
    return (
      function(){
        console.log("ON Unmount")
        clearInterval(clock)
      }
    )
  },[])

  function increraseCount(){
    setCount(count+1)
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increraseCount}>Increase Count</button>
    </div>
  )
}

export default App