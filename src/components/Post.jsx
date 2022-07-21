import { Button } from "@mui/material";
import { useContext } from "react";
import { PostsContext } from "../contexts/PostsContext";
import styles from "./Post.module.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Images } from "./Images";

export default function Post({ deletarPost, editarPost, curtirPost }) {
  const { user, content } = useContext(PostsContext);

  return (
    <div className={styles.posts}>
      {content.map(
        (item) =>
          item.id !== undefined && (
            <div key={item.id} className={styles.post}>
              <Images img={item.imagem} />
              <h2 className={styles.nome}>{item.nome}</h2>
              <p className={styles.content}>{item.post}</p>
              <h3 style={{ display: "none", visibility: "hidden" }}>
                {item.email}
              </h3>
              {user.email === item.email ? (
                <div className={styles.buttonGroup}>
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
                </div>
              ) : (
                <>
                  {item.like ? (
                    <div className={styles.groupLike}>
                      <ThumbUpIcon
                        onClick={() => curtirPost(item.post)}
                        className={styles.like}
                        color='success'
                      />
                      <span>Gostei do post</span>
                    </div>
                  ) : (
                    <div className={styles.groupLike}>
                      <ThumbDownIcon
                        onClick={() => curtirPost(item.post)}
                        className={styles.like}
                        color='error'
                      />
                      <span>Não gostei do post</span>
                    </div>
                  )}
                  {/* <p>{item.like ? "1" : "0"}</p> */}
                </>
              )}
            </div>
          )
      )}
    </div>
  );
}
