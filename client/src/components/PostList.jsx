/* eslint-disable react/prop-types */
import PostCard from "./PostCard"

const PostList = ({posts}) => {
  return (
    <div className="posts">
      {posts.map(post => <PostCard post={post} key={post.id}/>)}
    </div>
  )
}

export default PostList;