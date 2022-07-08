import React, { useContext, useEffect, useState } from "react";
import Post from "./components/Post";
import { PostsContext } from "./contexts/PostsContext";
import { logout } from "./firebase";

const Home = () => {
  const {
    user,
    post,
    setPost,
    nome,
    setNome,
    isCompleted,
    setIsCompleted,
    content,
    setContent,
  } = useContext(PostsContext);

  function loadData() {
    const saved = localStorage.getItem("content");
    if (saved) {
      setContent(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function saveData(data) {
    setContent(data);
    localStorage.setItem("content", JSON.stringify(data));
  }

  function addPost() {
    event.preventDefault();
    saveData([
      ...content,
      { post: post, nome: nome, email: user.email, isCompleted: isCompleted },
    ]);
    console.log(content);
    setPost("");
    setNome("");
    setIsCompleted(false);
  }

  function deletarPost(post) {
    const arrayDpsDaRemocao = content.filter((postExistente) => {
      return postExistente !== post;
    });

    saveData(arrayDpsDaRemocao);
  }

  function editarPost(post) {
    const arrayDpsDaRemocao = content.filter((postExistente) => {
      console.log(postExistente);
      return postExistente !== post;
    });
    const valorText = prompt("Digite um novo texto para este post");
    const valorName = prompt("Digite um novo nome para este post");

    saveData([
      { post: valorText, nome: valorName, email: user.email },
      ...arrayDpsDaRemocao,
    ]);

    setPost("");
    setNome("");
  }

  function checkedPost(post) {
    const dados = content.map((postExistente) => {
      if (postExistente.post === post) {
        return {
          ...postExistente,
          isCompleted: !postExistente.isCompleted,
        };
      }
      return postExistente;
    });
    saveData(dados);
  }

  function handleCaptureValuePost() {
    setPost(event.target.value);
  }

  function handleCaptureValueName() {
    setNome(event.target.value);
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
          required
          value={post}
        />
        <input
          type='text'
          onChange={handleCaptureValueName}
          placeholder='Nome'
          required
          value={nome}
        />
        <input
          type='email'
          placeholder='Email'
          style={{ display: "none" }}
          value={user.email}
        />
        <button type='submit'>Postar</button>
      </form>

      <div>
        <Post
          deletarPost={deletarPost}
          editarPost={editarPost}
          checkedPost={checkedPost}
        />
      </div>
    </div>
  );
};

export default Home;
