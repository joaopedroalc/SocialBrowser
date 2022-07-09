import { Button } from "@mui/material";
import { useContext } from "react";
import { PostsContext } from "../contexts/PostsContext";
import styles from "./Post.module.css";

export default function Post({ deletarPost, editarPost, checkedPost }) {
  const { user, content } = useContext(PostsContext);

  return (
    <div className={styles.posts}>
      {content.map((item) => (
        <div key={item.id}>
          <h2>Nome - {item.nome}</h2>
          <p className={item.isCompleted ? styles.checked : styles.unchecked}>
            Post:{item.post}
          </p>
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
              <button onClick={() => checkedPost(item.post)}>Marcar</button>
            </>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
}
