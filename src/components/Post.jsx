import { useContext } from "react";
import { PostsContext } from "../contexts/PostsContext";

export default function Post({ deletarPost, editarPost }) {
  const { content } = useContext(PostsContext);

  return (
    <div>
      {content.map((item) => (
        <>
          <h1>{item.post}</h1>
          <h2>{item.nome}</h2>
          <h3>{item.email}</h3>
          <button onClick={() => deletarPost(item)}>Deletar</button>
          <button onClick={() => editarPost(item)}>Editar</button>
        </>
      ))}
    </div>
  );
}
