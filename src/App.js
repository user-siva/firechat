import Button from "./components/Button";
import Channel from "./components/Channel";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useEffect, useState } from "react";

firebase.initializeApp({
  apiKey: "AIzaSyA3m-5KdSwIV5WhkZcgOEC5REnoVB14I1Y",
  authDomain: "chatkaro-23780.firebaseapp.com",
  projectId: "chatkaro-23780",
  storageBucket: "chatkaro-23780.appspot.com",
  messagingSenderId: "937570976658",
  appId: "1:937570976658:web:732e811de0a2aab9fb374b",
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();

    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  if (initializing) return "Loading...";

  return (
    <div>
      {user ? (
        <>
          <Button onClick={signOut}>Sign Out</Button>
          <Channel user={user} db={db} />
        </>
      ) : (
        <Button onClick={signInWithGoogle}>Sign In With Google</Button>
      )}
    </div>
  );
}

export default App;
