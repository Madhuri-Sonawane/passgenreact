import { useRef } from "react";
import { useState,useCallback,useEffect } from "react"


function App() {

  const [length,setLength] = useState(8);
  const [number,setNumber] = useState(false);
  const [character,setCharacter] =useState(false);
  const [Password,setPassword] =useState("")

  //useRef hook

const passwordRef =useRef(null)

  const passwordGenerator = useCallback(()=>{
    let Pass= ""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     
    if(number)str +="123456789"
    if(character) str += "!@#$%^&*(){|?><}[+]`~"

    for (let i=1; i<=length; i++) {
      let char = Math.floor(Math.random()*str.length+1)

      Pass +=str.charAt(char)
      
    }
    setPassword(Pass)

  },[length,number,character,setPassword])

const copyPasswordToClipboard =useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,99)
  window.navigator.clipboard.writeText(Password)
},[Password])

 useEffect(()=>{passwordGenerator()},
[length,number,character,passwordGenerator])

  return (
    <>
            
   

     <div className="w-full max-w-md mx-auto rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-800">
     <h1 className="text-white text-center text-4xl my-3">Password Generater</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text"  value={Password} className="outline-none w-full py-1 px-3" placeholder="password" readOnly 
         ref={passwordRef}/>
        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        onClick={copyPasswordToClipboard}
        >copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
      <div className="flex item-center gap-x-1">
        <input type="range"
        min={6}
        max={100}
        value={length}
        className="cursor-pointer" 
        onChange={(e)=>{setLength(e.target.value)}}/>
        <label htmlFor="">Length: {length} </label>
      </div>
      <div  className="flex item-center gap-x-1">
         <input type="checkbox"
         defaultChecked={number}
         id="numberInput"
         onChange={()=>{setNumber((prev)=>!prev);}} />
         <label>Number</label>
      </div>
      <div  className="flex item-center gap-x-1">
      <input type="checkbox"
         defaultChecked={character}
         id="characterInput"
         onChange={()=>{setCharacter((prev)=>!prev);}} />
         <label htmlFor="">Character</label>
      </div>
      </div>
      
     </div>
      </>
  )
}

export default App
