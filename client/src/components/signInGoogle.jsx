// import { useState, useEffect } from 'react';
// import GoogleLogin from 'google-auth-library';

// const GoogleSignInButton = () => {
//   const [clientId, setClientId] = useState('');
  
//   useEffect(() => {
//     // Replace with your actual Google Client ID from Step 1
//     setClientId(`${import.meta.env.GOOGLE_CLIENT_ID}`);
//   }, []);

//   const handleSignIn = async () => {
//     try {
//       const googleAuth = await GoogleLogin.getClientInstance({
//         clientId,
//       });

//       const response = await googleAuth.signIn();
//       const idToken = response.getAuthResponse().id_token;
//       console.log(idToken);
      
//       // Send the ID token to your backend for verification and user handling (explained later)
//       // const backendResponse = await fetch(`${import.meta.env.VIT_API_URL}/oauth/google`, {
//       //   method: 'POST',
//       //   body: JSON.stringify({ idToken }),
//       //   headers: { 'Content-Type': 'application/json' },
//       // });

//       // const data = await backendResponse.json();

//       // if(data){
//       //   console.log(data);
//       // }  
//       // Handle successful or failed login based on backend response (e.g., redirect to user profile)
//     } catch (error) {
//       console.error('Google Sign-in Error:', error);
//       // Handle sign-in errors gracefully (e.g., display an error message)
//     }
//   };

//   return (
//     <button type="button" onClick={handleSignIn}>
//       Google
//     </button>
//   );  
// };

// export default GoogleSignInButton;
