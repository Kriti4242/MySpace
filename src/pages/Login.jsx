import { useState } from "react"
import API from "../api"

export default function Login(){
 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
 const [error,setError]=useState("")

 const login = async () => {
  try{
    const res = await API.post("/auth/login",{email,password})
    localStorage.setItem("token",res.data.token)
    window.location="/dashboard"
  }catch(err){
    setError(err.response?.data?.message || "Something went wrong")
  }
 }

 return(
  <div className="container">
   <h2 className="login">Login</h2>

   {error && <p style={{color:"red"}}>{error}</p>}

   <input className="email" placeholder="Email" onChange={e=>setEmail(e.target.value)} />
   <input className="password" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
   <button className="btn" onClick={login}>Login</button>

   <p className="create" onClick={()=>window.location="/forgot"}>
  Forgot Password?
  </p>

   <p className="create" onClick={()=>window.location="/register"} >
     Create account
   </p>
  </div>
 )
}

