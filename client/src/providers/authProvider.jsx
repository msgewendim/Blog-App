import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage?.getItem("user")) || '')

  const register = async (inputs)=>{
    
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/oauth/register`, {
        method : "POST",
        headers : {
          'Content-Type': 'application/json'
        }, 
        body : JSON.stringify(inputs)
      });
      if(!result.ok) throw new Error('Network response was not ok')
      // console.log(result);
      Navigate("/login")
    } catch (error) {
      console.log(error.message);
    }
  }


  const login = async (inputs) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/oauth/login`, {
      method : "POST",
      headers : {
        'Content-Type': 'application/json'
      }, 
      body : JSON.stringify(inputs)
    })

    if(!res.ok) throw new Error('Network response was not ok')
    setCurrentUser(await res.json())
  }
  
  const logout = () => {
    setCurrentUser(null)
    sessionStorage.removeItem("user")
    toast.success("Logged out successfully")
  } 

  useEffect(()=>{
    sessionStorage.setItem("user", JSON.stringify(currentUser))    
  }, [currentUser])

  const value = {login, logout, currentUser, register , setCurrentUser, toast}
    
  return (
    <AuthContext.Provider value={value}>
      <ToastContainer position="top-center" autoClose={2500}/>
      {children}
    </AuthContext.Provider>
  )

};


export default AuthProvider;