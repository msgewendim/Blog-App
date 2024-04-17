-- Database: Create Database

DROP DATABASE IF EXISTS "blog_db"; 

CREATE DATABASE "blog_db"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Connect to blog_db
\c blog_db

-- drop tables
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.posts;

--  drop sequences for reset auto-incrementing IDs eve
DROP CASCADE SEQUENCE IF EXISTS users_id_seq;
DROP CASCADE SEQUENCE IF EXISTS posts_id_seq;

-- Create sequences for auto-incrementing IDs
CREATE SEQUENCE IF NOT EXISTS users_id_seq;
CREATE SEQUENCE IF NOT EXISTS posts_id_seq;

-- Create tables
CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    img character varying COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.posts
(
    id integer NOT NULL DEFAULT nextval('posts_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "desc" text COLLATE pg_catalog."default" NOT NULL,
    img text COLLATE pg_catalog."default",
    uid integer NOT NULL,
    date timestamp without time zone NOT NULL,
    category character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT posts_pkey PRIMARY KEY (id),
    CONSTRAINT uid FOREIGN KEY (uid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

-- Insert data into tables  

INSERT INTO public.users(username, email, password, img)
VALUES
    ('admin', 'Jn0p0@example.com', 'admin123', 'https://i.pinimg.com/736x/5f/7f/6f/5f7f6f6b5f7f6f6b5f7f6f6b5f7f6f6b.jpg'),
    ('user1', 'c6 DataGridViewCellStyle@example.com', 'user1123', 'https://i.pinimg.com/736x/5f/7f/6f/5f7f6f6b5f7f6f6b5f7f6f6b5f7f6f6b.jpg'),
    ('user2', 'Qn0p0@example.com', 'user2123', 'https://i.pinimg.com/736x/5f/7f/6f/5f7f6f6b5f7f6f6b5f7f6f6b5f7f6f6b.jpg');


INSERT INTO public.posts(title, "desc", img, uid, date, category)
VALUES
    ('first post', 'this is my first post', 'https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 1, CURRENT_DATE, 'Art'),
    ('second post', 'this is my second post', 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 2, CURRENT_DATE, 'Tech'),
    ('third post', 'this is my third post', 'https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 3, CURRENT_DATE, 'Fashion'),
    ('fourth post', 'this is my fourth post', 'https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 1, CURRENT_DATE, 'Food'),
    ('fifth post', 'this is my fifth post', 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 2, CURRENT_DATE, 'Design'),
    ('sixth post', 'this is my sixth post', 'https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 3, CURRENT_DATE, 'Cinema');