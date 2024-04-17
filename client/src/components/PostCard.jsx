/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const PostCard = ({post}) => {

  return (
    <div className="post">
      <div className="img">
          <img src={post.img} alt={post.title} />
      </div>
      <div className="content">
        <Link className='link' to={`/posts/${post.id}`}>
          <h1>{post.title}</h1>
        </Link>
        <p>{post.desc}</p>
        <Link to={`/posts/${post.id}`}>
          <button>Read More</button>  
        </Link>
      </div>
    </div>
  )
}

export default PostCard;