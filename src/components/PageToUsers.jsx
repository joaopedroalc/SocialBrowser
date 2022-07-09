import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostsContext } from "../contexts/PostsContext";
import { logout } from "../firebase";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import styles from "./PageToUsers.module.css";
import { Button } from "@mui/material";

const PageToUsers = () => {
  const {
    id,
    setId,
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
          // console.log(snapshot.val());
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
      {
        id: id,
        post: post,
        nome: nome,
        email: user.email,
        isCompleted: isCompleted,
      },
    ]);

    const db = getDatabase();
    set(ref(db, "posts/"), [
      ...content,
      {
        id: id,
        post: post,
        nome: nome,
        email: user.email,
        isCompleted: isCompleted,
      },
    ]);

    setId(uuidv4());
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
      { id: id, post: valorText, nome: valorName, email: user.email },
      ...arrayDpsDaRemocao,
    ]);

    const db = getDatabase();
    set(ref(db, "posts/"), [
      { id: id, post: valorText, nome: valorName, email: user.email },
      ...arrayDpsDaRemocao,
    ]);

    setId(uuidv4());
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
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Oi, {user.displayName}</h1>
        <div className={styles.userInfo}>
          <img src={user.photoURL} referrerPolicy='no-referrer' />
          <Button
            variant='contained'
            color='error'
            fontSize='small'
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </header>

      <main>
        <form method='post' onSubmit={addPost} className={styles.form}>
          <input
            type='text'
            onChange={handleCaptureValueName}
            placeholder='Nome'
            required
            value={nome}
          />
          <textarea
            type='text'
            onChange={handleCaptureValuePost}
            placeholder='Insira um post'
            required
            value={post}
          />

          <input
            type='email'
            placeholder='Email'
            style={{ display: "none" }}
            defaultValue={user.email}
          />
          <Button variant='contained' color='success' type='submit'>
            Postar
          </Button>
        </form>

        <div>
          <Post
            deletarPost={deletarPost}
            editarPost={editarPost}
            checkedPost={checkedPost}
          />
        </div>
      </main>
    </div>
  );
};

export default PageToUsers;
