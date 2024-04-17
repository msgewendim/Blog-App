// const PostService = jest.fn(); // Mock UserService
// import { PostController } from "../../controllers/PostController";

// describe('UserController', () => {
//   let postServiceMock: any;
//   let postController: PostController;

//   beforeEach(() => {
//     postServiceMock = {
//       addUser: jest.fn(),
//       getUser: jest.fn(),
//       updateUser: jest.fn(),
//       deleteUser: jest.fn(),
//       getAllUsers: jest.fn(),
//     };
//     postController = new PostController(postServiceMock);
//   });

//   // ... (test cases using userServiceMock)
//   test('addUser creates user successfully', async () => {
//     const userData = {
//       id: 1,
//       title: 'testPost',
//       "desc": 'test description',
//       img: 'test image',
//       uid: 1,
//       category: 'test category',
//     };
//     postServiceMock.ddUser.mockResolvedValue(userData);
  
//     const response = await postController.addPost(reqMock, resMock);
  
//     expect(response.status).toBe(201);
//     expect(response.json()).toEqual({ message: 'User created successfully' });
//     expect(postServiceMock.addUser).toHaveBeenCalledWith(userData);
//   });
// });



  // it("should add new user with status code 201", async () => {
  //   const res = await request(app).post("/users").send({
  //     username: "user7",
  //     img: "fake token",
  //     email: "etest@gmail.com",
  //     password : "12345"
  //   });

  //   expect(res.body).toEqual({ message: "User created successfully" });
  //   expect(res.status).toBe(201);
  // })


  // it("should not add new user without password & email status code 400", async () => {
  //   const res = await request(app).post("/users").send({
  //     username: "userToFAIL",
  //     img: "fake token",
  //   })
  //   expect(res.status).toBe(400);
  // })

  // it("should return user with given username status code 200", async () => {
  //   const username = "user5";
  //   const res = await request(app).get(`/users/${username}`);
  //   expect(res.status).toBe(200);
  //   expect(res.body).toBeTruthy();
  // });


  // it("should not return user with given username status code 404", async () => {
  //   const username = "fakeUsername";
  //   const res = await request(app).get(`/users/${username}`);
  //   expect(res.status).toBe(404);
  // });


  // it("should return all users array with status code 200", async () => {
  //   const res = await request(app).get("/users");
  //   expect(res.status).toBe(200);
  //   expect(Array.isArray(res.body)).toBeTruthy();
  // });

  // it("should delete a user with given id and return status code 200", async () => {
  //   const userId = 1;
  //   const res = await request(app).delete(`/users/${userId}`);
  //   expect(res.status).toBe(200); 
  // });




  // test('GET /posts retrieves all posts successfully', async () => {
  //   const response = await request(app).get('/posts');
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.posts.length).toBeGreaterThan(0);
  // });

  // test('GET /posts?uid=2 retrieves posts by user id successfully', async () => {
  //   const response = await request(app).get('/posts?uid=2');
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.posts.length).toBeGreaterThan(0);
  // });

  // test('GET /posts?cat=tech retrieves posts by category successfully', async () => {
  //   const response = await request(app).get('/posts?cat=tech');
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.posts.length).toBeGreaterThan(0);
  // });

  // test('GET /posts?filter=fourth retrieves posts by filter successfully', async () => {
  //   const response = await request(app).get('/posts?filter=fourth');
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.posts.length).toBeGreaterThan(0);
  // });

  // test('GET /posts?filter=fourth&cat=Food retrieves posts by filter and category successfully', async () => {
  //   const response = await request(app).get('/posts?filter=post&cat=Food');
  //   expect(response.statusCode).toBe(200);  
  //   expect(response.body.posts.length).toBeGreaterThan(0);
  // });
