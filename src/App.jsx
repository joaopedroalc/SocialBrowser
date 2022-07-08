import { useEffect, useState } from "react";
import "./App.css";
import { signInWithGoogle } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./Home";
import { PostsContext } from "./contexts/PostsContext";

const auth = getAuth();

function App() {
  const [post, setPost] = useState("");
  const [nome, setNome] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const [content, setContent] = useState([]);

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
          isCompleted,
          setIsCompleted,
          content,
          setContent,
          user,
          setUser,
        }}
      >
        {user ? (
          <Home />
        ) : (
          <button onClick={signInWithGoogle}>Logar com google</button>
        )}
      </PostsContext.Provider>
    </div>
  );
}

export default App;
