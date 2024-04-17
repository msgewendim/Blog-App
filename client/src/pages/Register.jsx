/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { BlogContext } from "../providers/blogProvider";

import GoogleAuth from "../components/GoogleAuth";


const Register = () => {
  
  const [inputs, setInputs] = useState({
    username : "", 
    email :"",
    password : ""
  });

  const [error, setError] = useState(null);
  const {toast} = useContext(BlogContext);
  const navigate = useNavigate()

  const handleChange = e =>{
    // keep previous data and update new data
    setInputs(prev => ({
      ...prev, [e.target.name] : e.target.value
    }))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/oauth/register`, {
        method : "POST",
        headers : {
          'Content-Type': 'application/json'
        }, 
        body : JSON.stringify(inputs)
      });
      if(!result.ok) {
        toast.error(await result.text())
      }
      // console.log(result);
      toast.success("Account created successfully")
      navigate("/login")
    } catch (error) {
      setError(error.message);
      toast.error(error.message)
    }
  }

  return (
    <div className="auth">
      <h1>Register</h1>
      <form >
        <input type="text" required placeholder="username" name="username" onChange={handleChange}/>
        <input type="email" required placeholder="email" name="email" onChange={handleChange}/>
        <input type="password" required placeholder="password" name="password" onChange={handleChange}/>
        <button onClick={handleSubmit}>Register</button>
        <GoogleAuth />
        { error &&
         <p>{error}</p>}
        <span>Already Have an account? <br /><Link to={"/login"}>Login</Link></span>
      </form>
    </div>  
  )
}

export default Register;