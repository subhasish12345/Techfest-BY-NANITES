
"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { UserData } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  registerForEvent: (eventId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser(user);
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        } else {
            // Create user doc if it doesn't exist, which can happen with social logins
            const newUser: UserData = {
                uid: user.uid,
                email: user.email!,
                displayName: user.displayName || user.email!.split('@')[0],
                profile: 'I am a student interested in technology and innovation.',
                registeredEvents: [],
                role: 'user',
            };
            await setDoc(userDocRef, newUser);
            setUserData(newUser);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      router.push("/dashboard");
    } catch (e: any) {
       if (e instanceof FirebaseError && e.code === 'auth/invalid-credential') {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An unknown error occurred. Please try again.");
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, pass: string, displayName: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(userCredential.user, { displayName });
      const newUser: UserData = {
        uid: userCredential.user.uid,
        email,
        displayName,
        profile: 'I am a student interested in technology and innovation.',
        registeredEvents: [],
        role: 'user',
      };
      await setDoc(doc(db, "users", userCredential.user.uid), newUser);
      setUser(userCredential.user);
      setUserData(newUser);
      router.push("/dashboard");
    } catch (e: any) {
      if (e instanceof FirebaseError && e.code === 'auth/email-already-in-use') {
        setError("This email is already registered. Please log in or use a different email.");
      } else {
        setError("An unknown error occurred during sign up. Please try again.");
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      router.push("/");
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const registerForEvent = async (eventId: string) => {
    if (!user) {
      throw new Error("You must be logged in to register for an event.");
    }
    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        registeredEvents: arrayUnion(eventId)
      });
      // refetch user data to update UI instantly
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      }
    } catch (e:any) {
      console.error(e);
      throw new Error(e.message || "An unknown error occurred during registration.");
    } finally {
        setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, userData, loading, error, login, signup, logout, registerForEvent }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
