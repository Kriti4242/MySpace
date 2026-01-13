import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}
