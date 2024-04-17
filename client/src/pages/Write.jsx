import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"

import { BlogContext } from "../providers/blogProvider";
import { useParams, useNavigate } from "react-router-dom";

const Write = () => {
  const [valueQUill, setValueQuill] = useState("");
  const [postData, setPostData] = useState({title : "", desc : "", img : "", cat : ""})
  const {addPost, updatePost, toast} = useContext(BlogContext);

  const {postId} = useParams()     // localhost:3000/posts/postId for addingPost

  const handleChange = (e) =>{
    const {name, value } = e.target
    setValueQuill(valueQUill)
    setPostData((prevData)=> ({...prevData, [name] : value}));
  };
  
  useEffect(()=>{
    setPostData((prevData)=>({...prevData, desc : valueQUill.slice(3,-4)})) // => <p>{desc}</p> 
  },[valueQUill])


  useEffect(()=>{
    if(postId){
      const fetchPost = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
            method : "GET",
          });
          if(!response.ok) return response.statusText;  
          const data = await response.json();
          setPostData(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchPost();
    }
  }, [postId]);

  const navigate = useNavigate()

  const handleClickAdd = () =>{
    addPost(postData)
    navigate("/posts")
    toast.success("Post added successfully")
  };

  const handleClickUpdate = () =>{
    updatePost(postId, postData)
    navigate(`/posts/${postId}`)
    toast.success("Post updated successfully")
  };

  return (
    <div className="add-post">
      <div className="content">
        <input type="text" placeholder="Title" onChange={handleChange} name="title" required/>
        <input type="url" onChange={handleChange} id="url" name="img" className="url" placeholder="Image Url"/>
        <div className="editorContainer">
          <ReactQuill  className="editor" name="desc" theme="snow" value={valueQUill} onChange={setValueQuill} required/>
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>  
            <b>status: </b>Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <div className="buttons">
            <button onClick={handleClickAdd}>Publish</button>
            <button onClick={handleClickUpdate}>Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">            
          <input type="radio" name="cat" value="art" id="art" onChange={handleChange}/>
          <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="science" id="science" onChange={handleChange}/>
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="tech" id="tech" onChange={handleChange}/>
            <label htmlFor="tech">Tech</label>
          </div>
          <div className="cat">
           <input type="radio" name="cat" value="food" id="food" onChange={handleChange}/>
           <label htmlFor="food">Food</label>
          </div>
          <div className="cat">
           <input type="radio" name="cat" value="cinema" id="cinema" onChange={handleChange}/>
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input type="radio" name="cat" value="design" id="design" onChange={handleChange}/>
            <label htmlFor="design">Design</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write;