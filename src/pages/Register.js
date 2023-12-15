import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate=useNavigate()
  const[data,setData]=useState({
    name:'',
    email:'',
    password:''
  })
  const registerUser=async(e)=>{
    e.preventDefault();
    const {name,email,password}=data
    try{
      const{data}=await axios.post('/Register',{
        name,email,password 
      })
      if(data.error){ 
        toast.error(data.error)
      }
      else{
        setData({})
        toast.success("Login Succesfull")
        navigate('/')
      }
    }
    catch(error){
      console.log(error)

    }

  }
  return (
    

    <div>
      <form onSubmit={registerUser}>
            <h2>Register   </h2>
            <label htmlFor="name">Username:</label>
            <input type="text" id="name" name="name" value={(data.name)} onChange={(e)=>setData({...data,name:e.target.value})}/>
            <label htmlFor="email">email:</label>
            <input type="email" id="email" name="email" value={(data.email)} onChange={(e)=>setData({...data,email:e.target.value})}/>
            <label htmlFor="Password">Password:</label>
            <input type="password" id="Password" name="Password" value={(data.password)} onChange={(e)=>setData({...data,password:e.target.value})} />

            <button id="b2" type="submit">Sign up</button>
        </form>
        
      
    </div>
  )
}

export default Register
