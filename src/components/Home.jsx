import { signInWithGoogle } from "../firebase";
import styles from "./Home.module.css";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import Phone from "../assets/phone.png";

export function Home() {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1>SocialBrowser</h1>
        <Button color='success' variant='contained' onClick={signInWithGoogle}>
          Logar com google
          <GoogleIcon style={{ marginLeft: "5px" }} />
        </Button>
      </header>
      <main>
        <div className={styles.colTwo}>
          <section>
            <img
              src='https://images.unsplash.com/flagged/photo-1574164908900-6275ca361157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
              alt='SocialBrowser'
              className={styles.ImgMain}
            />
          </section>
          <section className={styles.infos}>
            <h2>Uma rede social dentro do seu navegador</h2>
            <div className={styles.backgroundPhone}>
              <span>
                Compartilhe seus posts preferidos e o mundo todo poderá ver
              </span>
              <div className={styles.divPhone}>
                <img src={Phone} alt='Phone' />
                <div className={styles.textPhone}>
                  <p>
                    Não perca tempo adicionando amigos , aqui você publica sua
                    ideia e seu estilo de vida sem limitações.
                  </p>
                  <br />
                  <p>
                    A única regra é que os posts que mais tiverem ficarão no top
                    ranking e são ordenados sempre dos mais recentes para os
                    mais antigos
                  </p>
                </div>
              </div>
            </div>
            <footer>
              <a href='https://www.instagram.com/joaopedrocode/'>
                <p>@joaopedrocode</p>
              </a>
            </footer>
          </section>
        </div>
      </main>
    </div>
  );
}
