import { PostDataAccessSQL } from "../DAL/Post/PostDataAccessSQL";
import Post from "../models/Post";

export class PostService {
  private postDataAccess: PostDataAccessSQL;

  constructor(postDataAccess: PostDataAccessSQL) {
    this.postDataAccess = postDataAccess;
  }

  async addPost(postData: Partial<Post>): Promise<void> {
    try {
      const { title, desc, img, uid, category } = postData;
      if (!desc || !title || !uid) {
        throw new Error("desc, title and uid are required");
      }
      if (uid && typeof uid !== "number") {
        throw new Error("uid must be a number");
      }
      // create a new post
      const post = new Post(0, title, desc, img as string, uid, category);
      await this.postDataAccess.addPost(post);
    } catch (error) {
      throw new Error(`Unable to add Post: ${(error as Error).message}`);
    }
  }

  async getPost(id: number): Promise<Post> {
    const Post = await this.postDataAccess.getPost(id);
    if (!Post) {
      throw new Error(`Post with ID ${id} not found`);
    }
    return Post;
  }

  async getAllPosts(
    page: number,
    pageSize: number,
    uid?: number,
    filter?: string,
    category?: string
  ): Promise<Post[]> {
    try {
      if (uid  && typeof uid !== "number") {
        throw new Error("uid must be a number");
      }
      const result = await this.postDataAccess.getAllPosts(
        page,
        pageSize,
        uid,
        filter,
        category
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new Error(`Not found any posts`);
    }
  }

  async updatePost(id: number, updateData: Partial<Post>): Promise<void> {
    try {
      await this.postDataAccess.updatePost(id, updateData);
    } catch (error) {
      throw new Error(`Unable to update Post: ${(error as Error).message}`);
    }
  }

  async deletePost(id: number): Promise<void> {
    try {
      await this.postDataAccess.deletePost(id);
    } catch (error) {
      throw new Error(`Unable to delete Post: ${(error as Error).message}`);
    }
  }
}
