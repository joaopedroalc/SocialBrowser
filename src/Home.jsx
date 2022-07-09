import React, { useContext, useEffect, useState } from "react";
import Post from "./components/Post";
import { PostsContext } from "./contexts/PostsContext";
import { logout } from "./firebase";
import { getDatabase, ref, set, get, child } from "firebase/database";

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

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `posts/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setContent(snapshot.val());
        } else {
          console.log("No data available");
          setContent([{}]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function addPost() {
    event.preventDefault();
    setContent([
      ...content,
      { post: post, nome: nome, email: user.email, isCompleted: isCompleted },
    ]);

    const db = getDatabase();
    set(ref(db, "posts/"), [
      ...content,
      { post: post, nome: nome, email: user.email, isCompleted: isCompleted },
    ]);

    setPost("");
    setNome("");
    setIsCompleted(false);
  }

  function deletarPost(post) {
    const arrayDpsDaRemocao = content.filter((postExistente) => {
      return postExistente !== post;
    });

    console.log(arrayDpsDaRemocao);

    const db = getDatabase();
    set(ref(db, "posts/"), arrayDpsDaRemocao);

    setContent(arrayDpsDaRemocao);
  }

  function editarPost(post) {
    const arrayDpsDaRemocao = content.filter((postExistente) => {
      console.log(postExistente);
      return postExistente !== post;
    });
    const valorText = prompt("Digite um novo texto para este post");
    const valorName = prompt("Digite um novo nome para este post");

    setContent([
      { post: valorText, nome: valorName, email: user.email },
      ...arrayDpsDaRemocao,
    ]);

    const db = getDatabase();
    set(ref(db, "posts/"), [
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
    setContent(dados);
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
