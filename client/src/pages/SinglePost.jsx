import edit from '/images/edit.png';
import del from '/images/delete.png';
import { Link, useParams} from 'react-router-dom';
// import Menu from '../components/Menu';
import { useState, useEffect, useContext} from 'react';
import { BlogContext } from '../providers/blogProvider';
import { AuthContext } from "../providers/authProvider";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SinglePost = () => {
  const {currentUser} = useContext(AuthContext);
  const [post, setPost] = useState({});
  const {removePost, toast} = useContext(BlogContext);
  const {postId} = useParams()
  const navigate = useNavigate();
  const fetchPost = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        method : "GET",
      });
      if(!response.ok) return response.statusText;
      
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);     // fetch only when post-id is changed

  const handleDelete = () =>{
    removePost(postId)
    navigate("/posts")
    toast.success("Post deleted successfully")
  };

  return (
    <div className="singlePost">
      <div className="content">
        <img src={post.img} alt={post.title} />
        <div className="user">
          <img src='' alt="" />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            { currentUser.id === post.uid && 
              <Link to={`/posts/${postId}/edit`} >
                <img src={edit} alt="edit" />
              </Link> }
            { currentUser.id === post.uid &&    
              <img src={del} alt="delete" onClick={handleDelete} /> 
            }
          </div>
        </div>
        <h1>{post.title}</h1>
        <p>{post.desc}</p>
      </div>
      {/* <div className="menu">
        <Menu/>
      </div> */}
    </div>
  ) 
}

export default SinglePost;
