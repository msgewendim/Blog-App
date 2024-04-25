import { Link } from "react-router-dom";
import PostList from "../components/PostList";
import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../providers/blogProvider";

const Posts = () => {
  const {page , setPage, posts, fetchPosts} = useContext(BlogContext);
  const [error, setError] = useState("")
  
  const pagination =()=>{
    setPage(page+1) // loading more posts -> using fetchPosts at blogProvider
    fetchPosts()
  };  

  useEffect(()=>{
    if(!posts){
      setError("No More Posts Found");
      setPage(0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  return (
    <div className="AllPosts">
      { posts && <PostList posts={posts}/>}
      <div className="loadPosts">
        <Link to={`/posts?page=${page}`}>
          {posts && 
            <button onClick={pagination}>Load more</button>
          }
        </Link>
      </div>
      {error && 
        <div className="error">
          {error}
        </div>
      }
    </div>
  )
}

export default Posts;