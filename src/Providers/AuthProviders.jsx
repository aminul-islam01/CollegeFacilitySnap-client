import { createContext, useEffect, useState } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/Firebase.config';
import Swal from 'sweetalert2'


const auth = getAuth(app)
export const UserContext = createContext(null);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleGoogleSignIn = (location, Navigate) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // The signed-in user info.
        const loggedUser = result.user;
        setUser(loggedUser);
        Navigate(location);
        Swal.fire({
          icon: 'success',
          title: 'Login successfull',
          showConfirmButton: false,
          timer: 1500
        })
        // console.log(loggedUser);

      }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  const handleGithubSignIn = (location, Navigate) => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        // The signed-in user info.
        const loggedUser = result.user;
        setUser(loggedUser);
        Navigate(location);
        Swal.fire({
          icon: 'success',
          title: 'Login successfull',
          showConfirmButton: false,
          timer: 1500
        })
        // console.log(loggedUser);

      }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () => {
    return signOut(auth);
  }

  const emailVerified = () => {
    return sendEmailVerification(auth.currentUser)
  }

  const proFileUpdate = (loggedUser, name, photo) => {
    updateProfile(loggedUser, {
      displayName: name,
      photoURL: photo,
    })
      .then((result) => {
        console.log("profile updated");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false)
    });
    return () => {
      return unsubscribe();
    }

  }, [])

  const handleResetPassword = event => {
    const form = event.target.parentNode.parentNode;
    const email = form.email.value;
    // const email = emailRef.current.value;
    if (!email) {
      alert('Please provide your email address to reset password')
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Please check your email')
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 1500
        })
      })
  }


  // console.log(user)
  const userInfo = {
    user,
    handleGoogleSignIn,
    handleGithubSignIn,
    setUser,
    createUser,
    loginUser,
    logOut,
    loading,
    emailVerified,
    proFileUpdate,
    handleResetPassword
  }

  return (
    <UserContext.Provider value={userInfo}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthProviders;