import { useContext } from "react";
import { PostsContext } from "../contexts/PostsContext";

export default function Expenses({ removePost, editPost }) {
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

  return (
    <div>
      {content.map((item) => (
        <>
          <h1>{item[0]}</h1>
          <h2>{item[1]}</h2>
          <h3>{item[2]}</h3>

          {item === "" ? (
            ""
          ) : (
            <>
              <button
                onClick={() => {
                  const arrayDpsDaRemocao = content.filter((postExistente) => {
                    return postExistente !== item;
                  });

                  setContent(arrayDpsDaRemocao);
                }}
              >
                Deletar
              </button>
              <button
                onClick={() => {
                  const arrayDpsDaRemocao = content.filter((postExistente) => {
                    return postExistente !== item;
                  });
                  const valorText = prompt(
                    "Digite um novo texto para este post"
                  );
                  const valorName = prompt(
                    "Digite um novo nome para este post"
                  );
                  const valorEmail = prompt(
                    "Digite um novo email para este post"
                  );

                  setContent([
                    [valorText, valorName, valorEmail],
                    ...arrayDpsDaRemocao,
                  ]);
                  // [...content, [post,nome]]

                  setPost("");
                  setNome("");
                  setEmail("");
                }}
              >
                Editar
              </button>
            </>
          )}
        </>
      ))}
    </div>
  );
}
