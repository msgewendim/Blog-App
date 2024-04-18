/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from "../providers/authProvider";
import { BlogContext } from "../providers/blogProvider";
import GoogleAuth from "../components/GoogleAuth";


const Login = () => {
  const [inputs, setInputs] = useState({
    username : "", 
    password : ""
  });

  const { login } = useContext(AuthContext);
  const { toast } = useContext(BlogContext);
  
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleChange = e =>{
    // keep previous data and update new data
    setInputs(prev => ({
      ...prev, [e.target.name] : e.target.value
    }))
  }

  const handleLogin = async (e) =>{
    e.preventDefault()
    try {
      if (!login) {
        throw new Error("No login function provided")
      }
      await login(inputs)
      navigate("/")
      toast.success("Logged in successfully")
    } catch (err) {
      toast.error(err.message)
      setError(err.message);
    }
  }

  return (
    <div className="auth">
      <h1>Login</h1>
      <form >
        <input type="text" required placeholder="username" name="username" onChange={handleChange}/>
        <input type="password" required placeholder="password" name="password" onChange={handleChange}/>
        <button onClick={handleLogin}>Login</button>
        < GoogleAuth/>
         { error &&
         <p>{error}</p>}
        <span>sign-up to Have an account? <br /><Link to={"/register"}>Register</Link></span>
      </form>
    </div> 
  )
}

export default Login;