import { PostDataAccessSQL } from "../../DAL/Post/PostDataAccessSQL";
import Post from "../../models/Post";
import { Pool } from "pg";

describe("Testing PostDAL : ", () => {
  describe("Post Creation", () => {
    let pool: Pool;
    const postDataAccessSQL = new PostDataAccessSQL();

    const testPostData: Post = {
      id: 0,
      title: "Test Post Title",
      desc: "This is a test post description",
      img: "jest image",
      uid: 1,
      category: "testing",
      date: "12/12/23",
    };

    beforeEach(async () => {
      pool = await createConnectionPool();
    });

    afterEach(async () => {
      await pool.end();
    });

    it("should add post to posts table", async () => {
      const client = await pool.connect();
      try {
        const createdPost = await postDataAccessSQL.addPost(testPostData);

        expect(createdPost.id).toEqual(testPostData.id);
        expect(createdPost.title).toEqual(testPostData.title);
        expect(createdPost.desc).toEqual(testPostData.desc);
        expect(createdPost.uid).toEqual(testPostData.uid);
        expect(createdPost.category).toEqual(testPostData.category);
        expect(createdPost.img).toEqual(testPostData.img);
        expect(createdPost.date).toEqual(testPostData.date);
      } catch (error) {
        console.log("Adding Post failed : ", error);
      } finally {
        client.release();
      }
    });
  });

  // describe("Post Deletion", ()=>{
  //     let pool : Pool ;
  //     const postDataAccessSQL = new PostDataAccessSQL();

  //     const testPostId : number = 16;

  //     beforeEach( async ()=>{
  //         pool = await createConnectionPool()
  //     });

  //     afterEach(async ()=>{
  //         await pool.end()
  //     });

  //     it("should delete post using postId from posts table", async ()=> {
  //         const client = await  pool.connect();
  //         try {
  //             const deletedPostResult = await postDataAccessSQL.deletePost(testPostId)
  //             expect(deletedPostResult).toEqual(1);

  //             const checkQuery = "SELECT * FROM posts WHERE id = $1";
  //             const checkResult = await client.query(checkQuery, [testPostId]);

  //             expect(checkResult.rowCount).toEqual(0)     // deleted post not found !
  //         } catch (error) {
  //          console.log("Deleting Post failed : ", error);
  //         }finally{
  //             client.release()
  //         }
  //     })
  // })

  describe("Post Retrieval", () => {
    let pool: Pool;
    const postDataAccessSQL = new PostDataAccessSQL();

    const testPostId: number = 19;

    beforeEach(async () => {
      pool = await createConnectionPool();
    });

    afterEach(async () => {
      await pool.end();
    });

    it("should return a post using postId from posts table", async () => {
      const client = await pool.connect();
      try {
        const resultPost = await postDataAccessSQL.getPost(testPostId);
        expect(resultPost.id).toEqual(testPostId); // check same id
      } catch (error) {
        console.log("Retrieving Post failed : ", error);
      } finally {
        client.release();
      }
    });
  });

  describe("Get All Posts", () => {
    let pool: Pool;
    const postDataAccessSQL = new PostDataAccessSQL();

    beforeEach(async () => {
      pool = await createConnectionPool();
    });

    afterEach(async () => {
      await pool.end();
    });

    it("should return all(5) posts from posts table", async () => {
      const client = await pool.connect();
      try {
        const resultPosts = await postDataAccessSQL.getAllPosts();
        expect(resultPosts.length).toBeGreaterThan(0);
        expect(resultPosts.length).toBeLessThanOrEqual(5); // checking limit for 5 posts

        resultPosts.forEach((post) => {
          // checking columns
          expect(post).toHaveProperty("id");
          expect(post).toHaveProperty("title");
          expect(post).toHaveProperty("desc");
          expect(post).toHaveProperty("img");
          expect(post).toHaveProperty("uid");
          expect(post).toHaveProperty("date");
          expect(post).toHaveProperty("category");
        });
      } catch (error) {
        console.log("Retrieving Posts failed : ", error);
      } finally {
        client.release();
      }
    });

    it("should return posts by category", async () => {
      const client = await pool.connect();
      try {
        let category = "art";
        let page = undefined;
        let pageSize = undefined;
        let uid = undefined;
        let filter = undefined;

        let resultPosts = await postDataAccessSQL.getAllPosts(
          page,
          pageSize,
          uid,
          filter,
          category
        );

        expect(resultPosts.length).toBeGreaterThan(0);
        expect(resultPosts.length).toBeLessThanOrEqual(5); // max 5 posts
        resultPosts.forEach((post) => {
          expect(post.category).toBe(category);
        });

        category = "tech";
        resultPosts = await postDataAccessSQL.getAllPosts(
          page,
          pageSize,
          uid,
          filter,
          category
        );
        expect(resultPosts.length).toBeGreaterThan(0);
        expect(resultPosts.length).toBeLessThanOrEqual(5); // max 5 posts

        expect(resultPosts.length).toBeGreaterThan(0);
        resultPosts.forEach((post) => {
          expect(post.category).toBe(category);
        });

        category = "music"; // no such category
        resultPosts = await postDataAccessSQL.getAllPosts(
          page,
          pageSize,
          uid,
          filter,
          category
        );
        expect(resultPosts.length).toEqual(0);
      } catch (error) {
        console.log("Retrieving Posts failed : ", error);
      } finally {
        client.release();
      }
    });

    it("should return posts by userId", async () => {
      const client = await pool.connect();
      try {
        let page = undefined;
        let pageSize = undefined;
        let uid = 11;

        let resultPosts = await postDataAccessSQL.getAllPosts(
          page,
          pageSize,
          uid
        );
        expect(resultPosts.length).toBeGreaterThanOrEqual(0);
        expect(resultPosts.length).toBeLessThanOrEqual(5); // max 5 posts

        resultPosts.forEach((post) => {
          expect(post.uid).toBe(11);
        });

        uid = 1;
        resultPosts = await postDataAccessSQL.getAllPosts(page, pageSize, uid);
        expect(resultPosts.length).toBeGreaterThanOrEqual(0);
        expect(resultPosts.length).toBeLessThanOrEqual(5); // max 5 posts

        resultPosts.forEach((post) => {
          expect(post.uid).toBe(1);
        });

        uid = 20; // not exists
        resultPosts = await postDataAccessSQL.getAllPosts(page, pageSize, uid);
        expect(resultPosts.length).toEqual(0);
        expect(resultPosts.length).toBeLessThanOrEqual(5); // max 5 posts
      } catch (error) {
        console.log("Retrieving Posts failed : ", error);
      } finally {
        client.release();
      }
    });

    it("should return posts by filter", async () => {
      const client = await pool.connect();
      try {
        let page = undefined;
        let pageSize = undefined;
        let uid = undefined;
        let filter = "ipsum";

        let resultPosts = await postDataAccessSQL.getAllPosts(
          page,
          pageSize,
          uid,
          filter
        );
        expect(resultPosts.length).toBeGreaterThanOrEqual(0);
        resultPosts.forEach((post) => {
          expect(post.desc).toContain(filter); //
        });
      } catch (error) {
        console.log("Retrieving Posts failed : ", error);
      } finally {
        client.release();
      }
    });

    it("should page over posts", async () => {
      const client = await pool.connect();
      try {
        let page = 1;
        let pageSize = 5;
        let uid = undefined;

        let resultPosts = await postDataAccessSQL.getAllPosts(page, pageSize);

        expect(resultPosts.length).toEqual(5);
        // expect(resultPosts[0].id).toEqual(2);
        // expect(resultPosts[-1].id).toEqual(6);

        page = 2;
        resultPosts = await postDataAccessSQL.getAllPosts(page);
        expect(resultPosts.length).toEqual(5);
        // expect(resultPosts[0].id).toEqual(7);
        // expect(resultPosts[-1].id).toEqual(11);

        page = 1;
        pageSize = 10;
        resultPosts = await postDataAccessSQL.getAllPosts(page, pageSize);

        expect(resultPosts.length).toBeLessThanOrEqual(10);
      } catch (error) {
        console.log("Retrieving Posts failed : ", error);
      } finally {
        client.release();
      }
    });
  });

  describe("Updating POST", () => {
    let pool: Pool;
    const postDataAccessSQL = new PostDataAccessSQL();

    beforeEach(async () => {
      pool = await createConnectionPool();
    });

    afterEach(async () => {
      await pool.end();
    });

    it("should update all data of a post", async () => {
      const client = await pool.connect();
      try {
        const testPostUpdateData = {
          title: "Test Post Title is changed",
          desc: "This is a test post description is changed",
          img: "jest image changed",
          uid: 19,
          category: "category changed",
          date: "12-11-2020",
        };

        const resultPostUpdated = await postDataAccessSQL.updatePost(
          19,
          testPostUpdateData
        );

        expect(19).toEqual(resultPostUpdated.id);
        expect(testPostUpdateData.title).toEqual(resultPostUpdated.title);
        expect(testPostUpdateData.desc).toEqual(resultPostUpdated.desc);
        expect(testPostUpdateData.uid).toEqual(resultPostUpdated.uid);
        expect(testPostUpdateData.category).toEqual(resultPostUpdated.category);
        expect(testPostUpdateData.img).toEqual(resultPostUpdated.img);
        expect(testPostUpdateData.date).toEqual(resultPostUpdated.date);
      } catch (error) {
        console.log("Retrieving Posts failed : ", error);
      } finally {
        client.release();
      }
    });

    it("should update title of a post", async () => {
      const client = await pool.connect();
      try {
        const testPostUpdateData = {
          title: "Test Post Title update only",
        };
        const resultTitleUpdate = await postDataAccessSQL.updatePost(
          19,
          testPostUpdateData
        );
        expect(resultTitleUpdate.title).toEqual(testPostUpdateData.title);
      } catch (error) {
        console.log("Retrieving Posts failed : ", error);
      } finally {
        client.release();
      }
    });

    it("should update image of a post", async () => {
      const client = await pool.connect();
      try {
        const testPostUpdateData = {
          img: "Test Post image update only",
        };

        const resultTitleUpdate = await postDataAccessSQL.updatePost(
          19,
          testPostUpdateData
        );
        expect(resultTitleUpdate.img).toEqual(testPostUpdateData.img);
      } catch (error) {
        console.log("Retrieving Posts failed : ", error);
      } finally {
        client.release();
      }
    });

    it("should update description of a post", async () => {
      const client = await pool.connect();
      try {
        const testPostUpdateData = {
          desc: "Test Post Title update only",
        };

        const resultTitleUpdate = await postDataAccessSQL.updatePost(
          19,
          testPostUpdateData
        );
        expect(resultTitleUpdate.desc).toEqual(testPostUpdateData.desc);
      } catch (error) {
        console.log("Retrieving Posts failed : ", error);
      } finally {
        client.release();
      }
    });

    it("should update uid of a post", async () => {
      const client = await pool.connect();
      try {
        const testPostUpdateData = {
          uid: 1,
        };

        const resultTitleUpdate = await postDataAccessSQL.updatePost(
          19,
          testPostUpdateData
        );
        expect(resultTitleUpdate.uid).toEqual(testPostUpdateData.uid);
      } catch (error) {
        console.log("Retrieving Posts failed : ", error);
      } finally {
        client.release();
      }
    });

    it("should update category of a post", async () => {
      const client = await pool.connect();
      try {
        const testPostUpdateData = {
          category: "Test Post Title update only",
        };
        const resultTitleUpdate = await postDataAccessSQL.updatePost(
          19,
          testPostUpdateData
        );
        expect(resultTitleUpdate.category).toEqual(testPostUpdateData.category);
      } catch (error) {
        console.log("Retrieving Posts failed : ", error);
      } finally {
        client.release();
      }
    });
  });
});

const createConnectionPool = () => {
  return new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: parseInt(process.env.PORT || "5432"),
  });
};
