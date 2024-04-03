import { useState,useCallback,useEffect,useRef} from 'react'
 

function App() {
  let[number, setnumber] = useState(false)
  let[character, setcharacter] = useState(false)
  let[length,setlength]=useState(8)
  let[password,setpassword]=useState("")
  
  const passref=useRef(null)
  const PasswordGenerator=useCallback(()=>{
    let pass=""
    let use="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(number==true){
      use+="0123456789"
    }
    if(character==true){
      use+="!@#$%^&*-_+=[]{}~`"
    }
    for(let i=1;i<=length;i++){
      let ind=Math.floor(Math.random() * use.length+1)
      pass+=use.charAt(ind)
    }
    console.log(pass);
    setpassword(pass)
  },[length,number,character])

  const copypasswordtoclip=useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{PasswordGenerator()},[length,number,character,PasswordGenerator])

  return (
      <div className='w-full max-w-md mx-auto rounded-lg px-4 py-3 my-8 text-2xl text-blue-800 bg-yellow-400'>
        <h1 className='text-center '>Password Generator</h1>
        <div className='flex rounded-lg overflow-hidden mb-4'>
          <input type="text" 
          value={password}
          className='otuline-none w-full py-1 px-3'
           placeholder='password'
           readOnly
           ref={passref}
          />
          <button 
          onClick={copypasswordtoclip}
          className='outline-none bg-blue-400 px-3 py-0.5 shrink-0'> copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={24}
          value={length}
          className='curson-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label>length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={number}
          id="numberinput"
          onChange={()=>{
            setnumber((prev)=>!prev)
          }}
          />
          <label htmlFor="numberinput"> numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={character}
          id="charaterinput"
           onChange={()=>{
             setcharacter((prev)=>!prev)
           }} 
          />
          <label htmlFor="characterinput">characters</label>
          </div>
        </div>
      </div>
  )
}

export default App
