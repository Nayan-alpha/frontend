import React, { useState } from 'react'
import './login.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export default function Login(){
  const navigate=useNavigate()
  const[data,setData]=useState({
    email:'',
    password:'',

  }) 
  const loginUser=async(e)=>{
    
    e.preventDefault()
    const {email,password} = data
    try {
      const {data}=await axios.post('/Login',{
        email,password
      });
      console.log(data)
      if(data.error){
        toast.error(data.error)
      }
      else{
        navigate('/Home')
        setData({});
        
      }
    } catch (error) {
      console.log("error")
    }
  }
  // const login=(e)=>{
  //   axios.get("/")
  //   e.preventDefault();
      
  // }
  return (
   
    <div>
        <form onSubmit={loginUser}>
            <h2>Login</h2>
            <label htmlFor="email">Username:</label>
            <input type="email" id="email" name="email" value={(data.email)} onChange={(e)=>setData({...data,email:e.target.value})}/>
            <label htmlFor="Password">Password:</label>
            <input type="password" id="Password" name="Password" value={(data.password)} onChange={(e)=>setData({...data,password:e.target.value})} />
            <button id="b1" type="submit">Login</button>
            <Link to="/Register"><button id="b2" type="submit">Sign up</button></Link>
        </form>
      
    </div>
  )
}