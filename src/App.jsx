import { useEffect, useState } from "react";
import "./App.css";
import { signInWithGoogle } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./Home";
import { Link } from "react-router-dom";

const auth = getAuth();

function App() {
  const [post, setPost] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [content, setContent] = useState([post, nome]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <div className='App'>
      {user ? (
        <>
          <header>
            <nav>
              <Link to='/expenses'>Expenses</Link>
            </nav>
          </header>
          <Home
            user={user}
            post={post}
            setPost={setPost}
            nome={nome}
            setNome={setNome}
            email={email}
            setEmail={setEmail}
            content={content}
            setContent={setContent}
          />
        </>
      ) : (
        <button onClick={signInWithGoogle}>Logar com google</button>
      )}
    </div>
  );
}

export default App;
