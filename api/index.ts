import express from 'express';
import session from 'express-session';
import cors from "cors";
import postsRoute from './routes/postRoute';
import activityLogger from './middlewares/activityLogger';
import userRoute from "./routes/userRoutes"
import oauthRoute from './routes/oauthRoute';

// 
const PORT = 4000;
export const app = express();

// Middlewares
app.use(express.json());
app.use(activityLogger);

// Cors
app.use(cors({ 
    origin: 'http://localhost:3000',
    credentials : true,
}));

// Session
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true } // only send cookie over https
}));

// Routes
app.use("/posts", postsRoute);
app.use("/users", userRoute);
app.use("/oauth", oauthRoute );


app.listen(PORT, () => {
    console.log(`Server listening on PORT : ${PORT}`)
});