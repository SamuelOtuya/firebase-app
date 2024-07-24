import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("response.user:", response?.user);
      setUser(response?.user);
      setIsAuthenticated(true);
      return { success: true, data: response?.user };
    } catch (e) {
      return { success: false, msg: e.message };
    }
  };

  const register = async (email, password, username, profileurl) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("response.user:", response?.user);
      //setUser(response?.user);
      //setIsAuthenticated(true);

      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileurl,
        userId: response?.user?.uid,
      });
      setUser(response.user);
      setIsAuthenticated(true);
      return { success: true, data: response?.user };
    } catch (e) {
      return { success: false, msg: e.message };
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null), setIsAuthenticated(false);
      return {
        success: true,
      };
    } catch (e) {
      return {
        success: false,
        msg: e.message,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("Use Auth must be wrapped inside AuthContextProvider");
  }
  return value;
};
