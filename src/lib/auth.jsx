// ─────────────────────────────────────────────────────────────────
//  AUTH CONTEXT  ·  Google + Email/Password (Firebase)
// ─────────────────────────────────────────────────────────────────
import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "./firebase";

const AuthContext = createContext({
  user: null,
  loading: true,
  ready: false,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const value = {
    user,
    loading,
    ready: isFirebaseConfigured,
    signInWithGoogle: () =>
      signInWithPopup(auth, new GoogleAuthProvider()),
    signUpWithEmail: (email, password) =>
      createUserWithEmailAndPassword(auth, email, password),
    signInWithEmail: (email, password) =>
      signInWithEmailAndPassword(auth, email, password),
    logout: () => signOut(auth),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

// Firebase auth error codes ko human-friendly Hinglish message me badalta hai
export function friendlyAuthError(err) {
  const code = err?.code || "";
  const map = {
    "auth/invalid-email": "Email galat lag rahi hai.",
    "auth/user-not-found": "Is email se koi account nahi mila.",
    "auth/wrong-password": "Password galat hai.",
    "auth/invalid-credential": "Email ya password galat hai.",
    "auth/email-already-in-use": "Yeh email pehle se registered hai — sign in karo.",
    "auth/weak-password": "Password kamzor hai (kam se kam 6 characters).",
    "auth/popup-closed-by-user": "Google window band ho gayi — dobara try karo.",
    "auth/popup-blocked": "Popup block hua — browser me popups allow karo.",
    "auth/too-many-requests": "Bahut zyada attempts — thodi der baad try karo.",
  };
  return map[code] || "Kuch gadbad hui — dobara try karo.";
}
