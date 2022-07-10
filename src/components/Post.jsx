import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { PostsContext } from "../contexts/PostsContext";
import styles from "./Post.module.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export default function Post({ deletarPost, editarPost }) {
  const { user, content, like, setLike } = useContext(PostsContext);

  function curtirPost() {
    setLike(1);
  }

  function descurtirPost() {
    setLike(0);
  }

  return (
    <div className={styles.posts}>
      {content.map((item) => (
        <div key={item.id}>
          <h2>Nome - {item.nome}</h2>
          <p>Post:{item.post}</p>
          <h3 style={{ display: "none", visibility: "hidden" }}>
            {item.email}
          </h3>
          {user.email === item.email ? (
            <>
              <Button
                variant='outlined'
                color='error'
                onClick={() => deletarPost(item)}
              >
                Deletar
              </Button>
              <Button
                variant='outlined'
                color='info'
                onClick={() => editarPost(item)}
              >
                Editar
              </Button>
            </>
          ) : (
            <>
              {like === 0 ? (
                <ThumbDownIcon onClick={() => curtirPost()} />
              ) : (
                <ThumbUpIcon onClick={() => descurtirPost()} />
              )}
              <p>{like}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
