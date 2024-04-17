import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Posts from "./pages/Posts";
import SinglePost from "./pages/SinglePost";
import About from "./pages/About";
import GoogleAuth from "./components/GoogleAuth";


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children :[
            {
                path: "/", 
                element : <Home/>,
            },
            {
                path: "/login", 
                element : <Login/>,
            },
            {
                path: "/register", 
                element : <Register/>,
            },
            {
                path: "/posts", 
                element : <Posts/>,
            },
            {
                path: "/posts/:postId", 
                element : <SinglePost/>,
            },
            {
                path: "/posts/:postId/edit", 
                element : <Write/>,
            },
            {
                path: "/write", 
                element : <Write/>,
            },
            {
                path: "/about", 
                element : <About/>,
            },
            {
                path: "login", 
                element : <GoogleAuth/>
            }
        ]
    }
])
export default router;