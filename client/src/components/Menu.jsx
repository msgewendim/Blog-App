import { useContext } from "react";
import { BlogContext } from "../providers/blogProvider";


const Menu = () => {
  const {posts} = useContext(BlogContext)
  return (
    <div className="menu">
      <h1>Other Posts you may Like</h1>
      {posts.map(post => (
        <div className="post" key={post.id}>
          <img src={post.img} alt={post.title} />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  )
}

export default Menu;