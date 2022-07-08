import { useContext } from "react";
import { PostsContext } from "../contexts/PostsContext";
import styles from "./style.module.css";

export default function Post({ deletarPost, editarPost, checkedPost }) {
  const { user, content } = useContext(PostsContext);

  return (
    <div>
      {content.map((item) => (
        <>
          <h1 className={item.isCompleted ? styles.checked : styles.unchecked}>
            {item.post}
          </h1>
          <h2>{item.nome}</h2>
          <h3 style={{ display: "none", visibility: "hidden" }}>
            {item.email}
          </h3>
          {user.email === item.email ? (
            <>
              <button onClick={() => deletarPost(item)}>Deletar</button>
              <button onClick={() => editarPost(item)}>Editar</button>
              <button onClick={() => checkedPost(item.post)}>Marcar</button>
            </>
          ) : (
            ""
          )}
        </>
      ))}
    </div>
  );
}
