import { onAuthStateChanged, signInWithPopup } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { app, auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  PhoneAuthProvider,
  signInWithEmailAndPassword,
  signOut,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";

// Auth context logics
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider function
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  // Sign Up with Google provider
  function GoogleSignUp() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  // SingUp and LogIn with email and pass
  function SignUpWithEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function SignInWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function UpdateUserProfile(firstName, lastName, phone) {
    return updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
    });
  }

  // signOut function
  function SignUserOut() {
    return signOut(auth);
  }

  // User State management
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    GoogleSignUp,
    SignUserOut,
    SignUpWithEmail,
    SignInWithEmail,
    UpdateUserProfile,
  };
  return (
    <div>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </div>
  );
};
