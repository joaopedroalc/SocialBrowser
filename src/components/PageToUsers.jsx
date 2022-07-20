import React, { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostsContext } from "../contexts/PostsContext";
import { logout } from "../firebase";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import styles from "./PageToUsers.module.css";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PageToUsers = () => {
  const {
    id,
    setId,
    user,
    post,
    setPost,
    nome,
    setNome,
    image,
    setImage,
    imageURL,
    setImageURL,
    like,
    content,
    setContent,
  } = useContext(PostsContext);

  const [openForm, setOpenForm] = useState(false);

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
      {
        id: id,
        post: post,
        imagem: imageURL,
        nome: nome,
        email: user.email,
        like: like,
      },
    ]);

    const db = getDatabase();
    set(ref(db, "posts/"), [
      ...content,
      {
        id: id,
        post: post,
        imagem: imageURL,
        nome: nome,
        email: user.email,
        like: like,
      },
    ]);

    setId(uuidv4());
    setPost("");
    setNome("");
    setImage("");
    setImageURL("");
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
    const valorName = prompt("Digite um novo nome para este post");
    const valorText = prompt("Digite um novo texto para este post");

    console.log(valorName, valorText);

    if (valorName !== null && valorText !== null) {
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
      setImage("");
      setImageURL("");
    }
  }

  function curtirPost(post) {
    const dados = content.map((postExistente) => {
      if (postExistente.post === post) {
        // console.log({
        //   ...postExistente,
        //   like: !postExistente.like,
        // });
        return {
          ...postExistente,
          like: !postExistente.like,
        };
      }
      return postExistente;
    });
    console.log(dados);
    setContent(dados);
  }

  function handleCaptureValuePost() {
    setPost(event.target.value);
  }

  function handleCaptureValueName() {
    setNome(event.target.value);
  }

  function cadastrarPost() {
    setOpenForm(true);
  }

  function cancelarCadastrarPost() {
    setOpenForm(false);
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function handleCaptureValueImage(e) {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);

    const base64 = await convertToBase64(e.target.files[0]);
    console.log(base64);

    setImageURL(base64);
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
        {openForm ? (
          <form method='post' onSubmit={addPost} className={styles.form}>
            <div className={styles.headerForm}>
              <CloseIcon
                className={styles.closeIcon}
                onClick={cancelarCadastrarPost}
              />
            </div>
            <input
              type='text'
              onChange={handleCaptureValueName}
              placeholder='Nome'
              required
              value={nome}
            />
            <input
              type='file'
              name='image'
              onChange={handleCaptureValueImage}
            />
            {image ? (
              <img src={imageURL} width='50%' height='100%' />
            ) : (
              <img
                src='https://forum.bubble.io/uploads/default/original/3X/1/2/12e944afd917d123319c9074a7e72581785a3b38.png'
                width='50%'
                height='100%'
              />
            )}
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
        ) : (
          <Button
            color='success'
            style={{ width: "200px", height: "100%" }}
            variant='contained'
            onClick={cadastrarPost}
          >
            Cadastrar post
          </Button>
        )}

        <div>
          <Post
            deletarPost={deletarPost}
            editarPost={editarPost}
            curtirPost={curtirPost}
          />
        </div>
      </main>
    </div>
  );
};

export default PageToUsers;
