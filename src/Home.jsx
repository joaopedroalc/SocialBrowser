import React, { useContext, useState } from "react";
import { PostsContext } from "./contexts/PostsContext";
import { logout } from "./firebase";
import Expenses from "./routes/expenses";

const Home = () => {
  const {
    user,
    post,
    setPost,
    nome,
    setNome,
    email,
    setEmail,
    content,
    setContent,
  } = useContext(PostsContext);

  function addPost() {
    event.preventDefault();
    setContent([...content, [post, nome, email]]);
    setPost("");
    setNome("");
    setEmail("");
  }

  function handleCaptureValuePost() {
    setPost(event.target.value);
  }

  function handleCaptureValueName() {
    setNome(event.target.value);
  }

  function handleCaptureValueEmail() {
    setEmail(event.target.value);
  }

  return (
    <div className='home'>
      <h1>Hello, {user.displayName}</h1>
      <img src={user.photoURL} referrerPolicy='no-referrer' />
      <button className='button signout' onClick={logout}>
        Sign out
      </button>

      <form method='post' onSubmit={addPost} style={{ marginTop: "2rem" }}>
        <textarea
          type='text'
          onChange={handleCaptureValuePost}
          placeholder='Insira um post'
          value={post}
        />
        <input
          type='text'
          onChange={handleCaptureValueName}
          placeholder='Nome'
          value={nome}
        />
        <input
          type='email'
          onChange={handleCaptureValueEmail}
          placeholder='Email'
          value={email}
        />
        <button type='submit'>Postar</button>
      </form>

      <div>
        <Expenses />
      </div>
    </div>
  );
};

export default Home;
