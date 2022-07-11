import { Button } from "@mui/material";
import { useContext } from "react";
import { PostsContext } from "../contexts/PostsContext";
import styles from "./Post.module.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export default function Post({ deletarPost, editarPost, curtirPost }) {
  const { user, content } = useContext(PostsContext);

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
              {item.like ? (
                <ThumbUpIcon onClick={() => curtirPost(item.post)} />
              ) : (
                <ThumbDownIcon onClick={() => curtirPost(item.post)} />
              )}
              <p>{item.like ? "1" : "0"}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
