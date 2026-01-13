import { useState } from "react"
import API from "../api"

export default function ForgotPassword(){
  const [email,setEmail] = useState("")
  const [msg,setMsg] = useState("")

  const sendLink = async ()=>{
    try{
      const res = await API.post("/auth/forgot-password",{email})
      setMsg(res.data.message)
    }catch(err){
      setMsg("Email not found")
    }
  }

  return (
  <div className="container">
    <div className="auth-box">
      <h2 className="forgot">Forgot Password</h2>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <button  onClick={sendLink}>Send Reset Link</button>
      <p>{msg}</p>
    </div>
  </div>
)
}
