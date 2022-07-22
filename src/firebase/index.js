import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnvplPy-CH3R2piRTlc-TInYTol-asujA",
  authDomain: "teste-app-35d1f.firebaseapp.com",
  projectId: "teste-app-35d1f",
  storageBucket: "teste-app-35d1f.appspot.com",
  messagingSenderId: "221352448700",
  appId: "1:221352448700:web:99d9548ea4665ce3cab6b9",
  measurementId: "G-T2K37LP86C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    // console.log(user)
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
  window.location.reload();
};

export {
  auth,
  db,
  signInWithGoogle,
  logout
};