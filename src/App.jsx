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
  const [nome, setNome] = useState("");
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [post, setPost] = useState("");
  const [like, setLike] = useState(false);
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
          image,
          setImage,
          imageURL,
          setImageURL,
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
