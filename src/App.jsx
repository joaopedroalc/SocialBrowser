import { useEffect, useState } from "react";
import "./App.css";
import { signInWithGoogle } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./Home";
import { Link } from "react-router-dom";
import { PostsContext } from "./contexts/PostsContext";

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
      <PostsContext.Provider
        value={{
          post,
          setPost,
          nome,
          setNome,
          email,
          setEmail,
          content,
          setContent,
          user,
          setUser,
        }}
      >
        {user ? (
          <>
            <header>
              <nav>
                <Link to='/expenses'>Expenses</Link>
              </nav>
            </header>
            <Home />
          </>
        ) : (
          <button onClick={signInWithGoogle}>Logar com google</button>
        )}
      </PostsContext.Provider>
    </div>
  );
}

export default App;
