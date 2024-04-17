import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authProvider";
import { Navigate, useParams } from "react-router-dom";

export const BlogContext = createContext();

  // eslint-disable-next-line react/prop-types
  const BlogProvider = ({children}) => {
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const {currentUser, toast} = useContext(AuthContext);
    const {cat, filter} = useParams()
    
    const fetchPosts = async () => {
      try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/posts?page=${page? page : ""}&cat=${cat ? cat : ""}&filter=${filter ? filter :""}`, {
          method : "GET",
        });
        if(!response.ok) return Error("fetching failed!");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    
    useEffect(()=>{
      fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cat, page]);

    const addPost = async (post) =>{
      try {
        const newPost = {
          title : post.title,
          img : post.img,
          desc : post.desc,
          category  : post.cat, 
          uid : currentUser.id,
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
          method : "POST",
          headers : {
            'Content-Type': 'application/json'
          }, 
          body : JSON.stringify(newPost)
        });
        if(!response.ok) {
          console.warn(response.statusText); return response.status
        }
        toast.success("Post created!");

      } catch (error) {
        console.error(error);
      }
    };

    const removePost = async (postID) =>{
      try {        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postID}`, {
          method : "DELETE",
          headers : {
            'Content-Type': 'application/json'
          }, 
        });
        if(!response.ok) return response.statusText;
        toast.success("Post deleted!");
        fetchPosts()
        Navigate("/posts")      // refresh posts => and go to posts page
      } catch (error) {
        console.error(error.message);
      }
    };

    const updatePost = async (postId, updatedData) =>{
      try {  
        const updatedPost = {
          title : updatedData.title,
          img : updatedData.img,
          desc : updatedData.desc, 
          uid : currentUser.id,
        };
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
          method : "PUT",
          headers : {
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(updatedPost) 
        });
        if(!response.ok) return response.statusText;
        toast.success("Post updated!");
        fetchPosts();      
      } catch (error) {
        console.error(error.message);
      }
    }

    const value = {page, setPage, posts, fetchPosts, addPost, removePost, updatePost, setPosts, toast};
    return(
      <BlogContext.Provider value={value}>
        {children}
      </BlogContext.Provider>
    );
  };

export default BlogProvider;