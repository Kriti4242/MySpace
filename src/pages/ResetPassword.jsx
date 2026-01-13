import { useState } from "react"
import { useParams } from "react-router-dom"
import API from "../api"

export default function ResetPassword(){
  const {token} = useParams()
  const [password,setPassword] = useState("")
  const [msg,setMsg] = useState("")

  const reset = async ()=>{
    try{
      await API.post("/auth/reset-password/"+token,{password})
      setMsg("Password updated. You can login now.")
    }catch(err){
      setMsg("Invalid or expired token")
    }
  }

  return (
    <div className="container">
      <div className="auth-box">
        <h2>Reset Password</h2>
        <input 
          type="password"
          placeholder="New Password"
          onChange={e=>setPassword(e.target.value)}
        />
        <button className="btn" onClick={reset}>Reset Password</button>
        <p>{msg}</p>
      </div>
    </div>
  )
}
