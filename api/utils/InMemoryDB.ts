import Post from "../models/Post";

class InMemoryDB{
    private static instance : InMemoryDB;
    private posts: Map<number, Post> = new Map();

    private constructor(){}

    // create this class only one-time
    public static getInstance(): InMemoryDB {
        if (!InMemoryDB.instance){
            InMemoryDB.instance = new InMemoryDB();
        }
        return InMemoryDB.instance;
    }

    // METHODS OF POST
    addPost(post:Post) {
        this.posts.set(post.id, post)
    }

    getPost(id:number):Post | undefined{
        return this.posts.get(id)
    }
    
    updatePost(id: number, postData: Partial<Post>) {
        let post = this.posts.get(id);
        if (post) {
          // Update attributes of the post
          post = {...post, ...postData};
          this.posts.set(id, post);
        }
      }
    
    deletePost(id: number) {
        this.posts.delete(id);
      }
    
    getAllPosts(): Post[] {
      const posts = Array.from(this.posts.values())
      return posts
    }
  }
  
export default InMemoryDB;
