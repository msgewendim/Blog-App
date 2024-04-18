import { createContext, useEffect, useState } from "react";
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
    console.log(res.body, "from login");
    if(!res.ok) throw new Error('Network response was not ok')
    const data = await res.json()
    setCurrentUser(data.otherUserData)
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