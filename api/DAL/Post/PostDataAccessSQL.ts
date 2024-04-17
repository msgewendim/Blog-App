import pool from "../../utils/db";
import Post from "../../models/Post";
import { DataAccess } from "./InterfacePostDataAccess";

export class PostDataAccessSQL implements DataAccess<Post> {
  async addPost(post: Post): Promise<Post> {
    const query =
      'INSERT INTO posts (title, "desc", img, category, uid, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const result = await pool.query(query, [
      post.title,
      post.desc,
      post.img,
      post.category,
      post.uid,
      post.date,
    ]);
    return result.rows[0];
  }

  async deletePost(id: number): Promise<number | null> {
    const query = "DELETE FROM posts WHERE id = $1";
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      throw new Error(`Post with ID ${id} not found`);
    } else {
      return result.rowCount; // return number of rows deleted
    }
  }

  async updatePost(id: number, updateData: Partial<Post>): Promise<Post> {
    let query = "UPDATE posts SET ";
    const updates: string[] = [];
    const values: (string | number)[] = [];

    Object.entries(updateData).forEach(([key, value], index) => {
      updates.push(`${key} = $${index + 1}`);
      values.push(value);
    });

    values.push(id);
    query += updates.join(", ") + " WHERE id = $" + values.length;
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      throw new Error(`Post with ID ${id} not found`);
    }
    return result.rows[0]; // returning updated post
  }

  async getPost(id: number): Promise<Post> {
    const query = "SELECT * FROM posts WHERE id = $1";
    const result = await pool.query(query, [id]);
    if (result.rows.length + 1 === 0) {
      throw new Error(`Post with ID ${id} not found`);
    }
    return result.rows[0];
  }

  async getAllPosts(
    page?: number,
    pageSize?: number,
    uid?: number,
    filter?: string,
    category?: string
  ): Promise<Post[]> {
    if (!page) {
      page = 1;
    }
    if (!pageSize) {
      pageSize = 5;
    }
    let query = "SELECT * FROM posts";
    const params: (string | number)[] = [];

    const offset = (page - 1) * pageSize;
    params.push(offset, pageSize); // [1, 5]

    if (category) {
      params.push(`%${category.toLowerCase()}%`); // [1,5,category]
      query += ` WHERE category ILIKE $${params.length}`;
    }

    if (uid) {
      params.push(`${uid}`); // [1,5,uid]
      query += ` ${category ? `AND` : `WHERE`} uid = $${params.length}`;
    }

    if (filter) {
      params.push(`%${filter}%`); // [1,5,category, filter]
      query += ` ${category || uid ? `AND` : `WHERE`} title ILIKE $${
        params.length
      } OR "desc" ILIKE $${params.length}`;
    }

    query += " OFFSET $1 LIMIT $2";
    const result = await pool.query(query, params);

    if (result.rows.length + 1 === 0) {
      throw new Error("No posts found");
    }

    return result.rows;
  }
}
