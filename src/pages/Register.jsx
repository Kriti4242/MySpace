import { useState } from "react"
import API from "../api"

export default function Register(){
 const [form,setForm]=useState({name:"",email:"",password:""})
 const [error,setError]=useState("")

 const register = async () => {
  try {
    const res = await API.post("/auth/register", form)

    localStorage.setItem("token", res.data.token)
    localStorage.setItem("user", JSON.stringify(res.data.user))

    window.location = "/"
  } catch (err) {
    setError(err.response?.data?.message || "Email already exists")
  }
}

 return(
  <div className="container">
   <h2 className="register">New User</h2>

   {error && <p style={{color:"red"}}>{error}</p>}

   <input className="new" placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
   <input className="new" placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
   <input className="new" type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
   <button className="btn-register" onClick={register}>Register</button>
  </div>
 )
}

