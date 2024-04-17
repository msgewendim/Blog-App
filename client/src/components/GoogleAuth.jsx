import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useContext } from 'react';
import {useNavigate} from "react-router-dom"
import { AuthContext } from '../providers/authProvider';
import { BlogContext } from '../providers/blogProvider';
const GoogleAuth = () => {
  
  const navigate = useNavigate()
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ;
  const { setCurrentUser } = useContext(AuthContext);
  const { toast } = useContext(BlogContext);
  const handleSuccess = async (credentialResponse) => {
    // send credentialResponse to backend
    const response = await fetch(`${import.meta.env.VITE_API_URL}/oauth/google`, {
      method: "POST",
      redirect : 'follow',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentialResponse)
    })

    // const data = await response.json();
    if(!response.ok) throw new Error('Network response was not ok')
    const data = await response.json();

    setCurrentUser(data)
    navigate("/")
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin 
        onSuccess={credentialResponse => {
          handleSuccess(credentialResponse)
          toast.success('Signed In with Google succeeded')
        }}
        onError={() => { 
          toast.error('Signed In with Google Failed')
        }} 
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;


