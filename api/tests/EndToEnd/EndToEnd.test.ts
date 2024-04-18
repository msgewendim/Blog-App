import request from 'supertest';
import {app} from '../../index';
import { execSync } from 'child_process';

// USERS ENDPOINTS TESTS

beforeAll(() => { 
  execSync("npm run rebuild_db");
})

describe('UserController Router', () => {

  beforeAll(async () => {
    
    await request(app).post("/users").send({
      username: "user4",
      img: "fake image 4",
      email: "email@example.com",
      password : "12345"
    })
    await request(app).post("/users").send({
      username: "user5",
      img: "fake image 5",
      email: "test@example.com",
      password : "12345"
    })
    await request(app).post("/users").send({
      username: "user6",
      img: "fake image 6",
      email: "walla@example.com",
      password : "12345"
    })

  })


  describe('should add new user with status code 201', () => {
    
    it('test', async () => {
      const res = await request(app).post("/users").send({
        username: "user7",
        img: "fake token",
        email: "etest@gmail.com",
        password : "12345"
      });

      expect(res.body).toEqual({ message: "User created successfully" });
      expect(res.status).toBe(201);
    })
  })

  describe('should not add new user without password & email status code 400', () => {
    it('test', async () => {
      const res = await request(app).post("/users").send({
        username: "userToFAIL",
        img: "fake token",
      })
      expect(res.status).toBe(400);
    })
  })

  describe('should return user with given username status code 200', () => {
    it('test', async () => {
      const username = "user5";
      const res = await request(app).get(`/users/${username}`);
      expect(res.status).toBe(200);
      expect(res.body).toBeTruthy();
    });
  })

  describe('should not return user with given username status code 404', () => {
    it('test', async () => {
      const username = "fakeUsername";
      const res = await request(app).get(`/users/${username}`);
      expect(res.status).toBe(404);
    })
  })

  describe('should return all users array with status code 200', () => {
    it('test', async () => {
      const res = await request(app).get("/users");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    })
  })

  describe('should delete a user with given id and return status code 200', () => {
    it('test', async () => {
      const userId = 3;
      const res = await request(app).delete(`/users/${userId}`);
      expect(res.status).toBe(200);
    })
  })
})


// POSTS ENDPOINTS TESTING

describe('PostController Router', () => {
  
  // SUCCESS TESTS

  describe('GET /posts', () => {
    test('retrieves all posts successfully', async () => {
      const response = await request(app).get('/posts');
      expect(response.statusCode).toBe(200);
      expect(response.body.posts.length).toBeGreaterThan(0);
    });
  })

  describe('GET /posts?uid=2', () => {
    test('retrieves posts by user id successfully', async () => {
      const response = await request(app).get('/posts?uid=2');
      expect(response.statusCode).toBe(200);
      expect(response.body.posts.length).toBeGreaterThan(0);
    });
  })

  describe('GET /posts?cat=tech', () => {
    test('retrieves posts by category successfully', async () => {
      const response = await request(app).get('/posts?cat=tech');
      expect(response.statusCode).toBe(200);
      expect(response.body.posts.length).toBeGreaterThan(0);
    });
  })

  describe('GET /posts?filter=second', () => {
    test('retrieves posts by filter successfully', async () => {
      const response = await request(app).get('/posts?filter=second');
      expect(response.statusCode).toBe(200);
      expect(response.body.posts.length).toBeGreaterThan(0);
    });
  })

  describe('GET /posts?filter=fourth&cat=Food', () => {
    test('retrieves posts by filter and category successfully', async () => {
      const response = await request(app).get('/posts?filter=post&cat=Food');  
      expect(response.statusCode).toBe(200);  
      expect(response.body.posts.length).toBeGreaterThan(0);
    });
  })

  
  describe('POST /posts', () => {
    test('adds a new post successfully', async () => {
      const response = await request(app).post('/posts').send({
        "title": "test post",
        "img": "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "uid": 2,
        "category": "Design"
    });
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe('Post created successfully');
    });
  });

  describe('GET /posts/:id', () => {
    test('retrieves a single post successfully', async () => {
      const postId = 2;
      const response = await request(app).get(`/posts/${postId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeTruthy();
    });
  });

  describe('DELETE /posts/:id', () => {
    test('deletes a post successfully', async () => {
      const postId = 2;
      const response = await request(app).delete(`/posts/${postId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe(`Post ${postId} deleted successfully`);
    });
  });

  describe('PUT /posts/:id', () => {
    test('updates a post successfully', async () => {
      const postId = 4;
      const response = await request(app).put(`/posts/${postId}`).send({
        title: 'Updated Post',
        desc: 'Updated Description',
        img: 'http://updated.com/image.jpg',
        category: 'updated',
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe(`Post ${postId} updated successfully`);
    });
  }); 

  // FAILURE TESTS

  describe('failure cases', () => {

    test('GET /posts/:id returns 404 if post does not exist', async () => {
      const postId = 1009;
      const response = await request(app).get(`/posts/${postId}`);
      expect(response.statusCode).toBe(404);
    });

  });

  describe('deletion cases', () => {

    test('DELETE /posts/:id returns 400 if post does not delete', async () => {
      const postId = 100;
      const response = await request(app).delete(`/posts/${postId}`);
      expect(response.statusCode).toBe(400);
    });

  });

  describe('update cases', () => {

    test('PUT /posts/:id returns 400 if post does not exist', async () => {
      const postId = 100;
      const response = await request(app).put(`/posts/${postId}`).send({
        title: 'Updated Post',
        desc: 'Updated Description',
        img: 'http://updated.com/image.jpg',
        category: 'updated', 
        uid: 1
      });
      expect(response.statusCode).toBe(400);
    });

  });

  describe('creation cases', () => {

    test('POST /posts returns 400 if title is missing', async () => {
      const response = await request(app).post('/posts').send({
        desc: 'Test Description',
        img: 'http://test.com/image.jpg',
        category: 'test', 
        uid: 1
      });
      expect(response.statusCode).toBe(400);
    });

    test('POST /posts returns 400 if desc is missing', async () => {
      const response = await request(app).post('/posts').send({
        title: 'Test Post',
        img: 'http://test.com/image.jpg',
        category: 'test', 
        uid: 1
      });
      expect(response.statusCode).toBe(400);
    }); 

    test('POST /posts returns 400 if uid is missing', async () => {
      const response = await request(app).post('/posts').send({
        title: 'Test Post',
        desc: 'Test Description',
        img: 'http://test.com/image.jpg',
        category: 'test', 
      });
      expect(response.statusCode).toBe(400);
    });

  });

  describe('retrieval cases', () => {

    test('GET /posts returns 404 if filters and no posts found', async () => {
      const response = await request(app).get('/posts?filter=notavalidfilter');
      expect(response.statusCode).toBe(404);
    });

    test('GET /posts returns 404 if category is invalid', async () => {
      const response = await request(app).get('/posts?cat=invalid');
      expect(response.statusCode).toBe(404);
    }); 

  })

})