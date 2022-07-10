import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PageToUsers from "./components/PageToUsers";
import { PostsContext } from "./contexts/PostsContext";
import { Home } from "./components/Home";
import { v4 as uuidv4 } from "uuid";
import "./reset.css";
import "./globals.css";

const auth = getAuth();

function App() {
  const [post, setPost] = useState("");
  const [nome, setNome] = useState("");
  const [like, setLike] = useState(0);
  const [id, setId] = useState(uuidv4());

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
          id,
          setId,
          post,
          setPost,
          nome,
          setNome,
          like,
          setLike,
          content,
          setContent,
          user,
          setUser,
        }}
      >
        {user ? <PageToUsers /> : <Home />}
      </PostsContext.Provider>
    </div>
  );
}

export default App;
