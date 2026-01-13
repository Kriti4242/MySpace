import axios from "axios"

const API = axios.create({
 baseURL: "https://myspace-fsp3.onrender.com"
})

API.interceptors.request.use(req => {
  req.headers.authorization = localStorage.getItem("token")
  return req
})

export default API

