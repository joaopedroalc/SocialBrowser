import React, { useContext, useEffect } from "react";
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
    email,
    setEmail,
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
    saveData([...content, { post: post, nome: nome, email: email }]);
    setPost("");
    setNome("");
    setEmail("");
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
    const valorEmail = prompt("Digite um novo email para este post");

    saveData([
      { post: valorText, nome: valorName, email: valorEmail },
      ...arrayDpsDaRemocao,
    ]);

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
        <Post deletarPost={deletarPost} editarPost={editarPost} />
      </div>
    </div>
  );
};

export default Home;
