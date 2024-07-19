import { useState , useCallback,useEffect,useRef} from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [characters,setCharacters] = useState(false)
  const [password,setPassword] = useState("")
  //useRef Hook
  const passwordRef = useRef(null)
  const  passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number)  str +="0123456789"
    if(characters) str += "!@#$%^&*(){}[]:;<>,.?/"
    for(let i=1;i<= length;i++ ){
        const char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt (char)
    }
    setPassword(pass)
    
  },[length,number,characters,setPassword])
  const copyPassword = useCallback( ()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  
  },[password])
  useEffect(()=>{
    passwordGenerator()
  },[length,number,characters,passwordGenerator])
  return (
    <>
  <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text" name="" id="" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef}/>
      <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPassword} >Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" name="" id="" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
        <label htmlFor="">Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" name="" id="numberInput" defaultChecked = {number} onChange={()=>{setNumber(prevValue => !prevValue)}}/>
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <input type="checkbox" name="" id="characterInput" defaultChecked = {characters} onChange={()=>{setCharacters(prevValue => !prevValue)}}/>
        <label htmlFor="characterInput">Characters</label>
    </div>
  </div>
    </>
  )
}

export default App
