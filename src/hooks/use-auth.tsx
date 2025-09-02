
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
  updatePassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, serverTimestamp, runTransaction } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { UserData, UserProfileFormData, EventRegistration } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  registerForEvent: (eventId: string) => Promise<void>;
  updateUserProfile: (profileData: Partial<UserProfileFormData>) => Promise<void>;
  updateUserPassword: (newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);
      if (user) {
        setUser(user);
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        } else {
            const newUser: UserData = {
                uid: user.uid,
                email: user.email!,
                displayName: user.displayName || user.email!.split('@')[0],
                profile: 'I am a student interested in technology and innovation.',
                registeredEvents: [],
                role: 'user',
                regNo: '',
                degree: '',
                branch: '',
                semester: '',
                section: '',
                mobileNo: '',
                profilePhoto: user.photoURL || '',
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
    setSuccessMessage(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      if (!userCredential.user.emailVerified) {
          setError("Please verify your email before logging in. Check your inbox for a verification link.");
          await signOut(auth); // Log out user until they are verified
      } else {
          router.push("/dashboard");
      }
    } catch (e: any) {
       if (e instanceof FirebaseError) {
            if (e.code === 'auth/invalid-credential' || e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found') {
                setError("Invalid email or password. Please try again.");
            } else {
                setError("An unknown error occurred. Please try again later.");
            }
       } else {
         setError("An unexpected error occurred. Please try again.");
       }
       console.error("Login Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, pass: string, displayName: string) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(userCredential.user, { displayName });
      await sendEmailVerification(userCredential.user);
      
      const adminEmails = ['admin@gmail.com', 'sadmisn@gmail.com'];

      const newUser: UserData = {
        uid: userCredential.user.uid,
        email,
        displayName,
        profile: 'I am a student interested in technology and innovation.',
        registeredEvents: [],
        role: adminEmails.includes(email) ? 'admin' : 'user',
        regNo: '',
        degree: '',
        branch: '',
        semester: '',
        section: '',
        mobileNo: '',
        profilePhoto: '',
      };

      await setDoc(doc(db, "users", userCredential.user.uid), newUser);
      
      setSuccessMessage("Account created! Please check your email to verify your account before logging in.");
      await signOut(auth); // Sign out user until they verify
      router.push("/auth");

    } catch (e: any) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/email-already-in-use') {
            setError("This email is already registered. Please log in or use a different email.");
        } else {
            setError("An unknown error occurred during sign up. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Signup Error:", e);
    } finally {
      setLoading(false);
    }
  };
  
  const sendPasswordReset = async (email: string) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
        await sendPasswordResetEmail(auth, email);
        setSuccessMessage("Password reset email sent! Check your inbox.");
    } catch (e: any) {
        if (e instanceof FirebaseError && e.code === 'auth/user-not-found') {
            // For security, Firebase doesn't throw user-not-found by default on the client.
            // This error might not trigger, but we keep it for completeness.
            // The success message will be shown regardless to prevent email enumeration.
            setSuccessMessage("If an account exists for this email, a password reset link has been sent.");
        } else {
            console.error("Password Reset Error:", e);
            setSuccessMessage("If an account exists for this email, a password reset link has been sent.");
        }
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
    if (!user || !userData) {
      throw new Error("You must be logged in to register for an event.");
    }
    setLoading(true);
    try {
      await runTransaction(db, async (transaction) => {
        const userRef = doc(db, "users", user.uid);
        const registrationRef = doc(db, `events/${eventId}/registrations`, user.uid);

        transaction.update(userRef, {
          registeredEvents: arrayUnion(eventId)
        });

        const registrationData: EventRegistration = {
          userId: user.uid,
          userName: userData.displayName,
          userEmail: userData.email,
          regNo: userData.regNo || '',
          branch: userData.branch || '',
          semester: userData.semester || '',
          registeredAt: serverTimestamp() as any,
        };
        transaction.set(registrationRef, registrationData);
      });

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      }

    } catch (e:any) {
      console.error("Transaction failed: ", e);
      throw new Error(e.message || "An unknown error occurred during registration.");
    } finally {
        setLoading(false);
    }
  }

  const updateUserProfile = async (profileData: Partial<UserProfileFormData>) => {
    if (!user) {
        throw new Error("You must be logged in to update your profile.");
    }
    setLoading(true);
    try {
        const userRef = doc(db, "users", user.uid);
        
        if (profileData.displayName && profileData.displayName !== user.displayName) {
          await updateProfile(user, { displayName: profileData.displayName });
        }
        
        await updateDoc(userRef, profileData);
        const updatedUserDoc = await getDoc(userRef);
        if (updatedUserDoc.exists()) {
            setUserData(updatedUserDoc.data() as UserData);
        }
    } catch(e: any) {
        console.error("Profile Update Error:", e);
        throw new Error(e.message || "An unknown error occurred while updating the profile.");
    } finally {
        setLoading(false);
    }
  }

  const updateUserPassword = async (newPassword: string) => {
    if (!auth.currentUser) {
        throw new Error("You must be logged in to update your password.");
    }
    try {
        await updatePassword(auth.currentUser, newPassword);
    } catch (error: any) {
        console.error("Password Update Error:", error);
        if (error.code === 'auth/requires-recent-login') {
            throw new Error("This action requires a recent login. Please log out and log back in to change your password.");
        }
        throw new Error(error.message || "An unknown error occurred while updating the password.");
    }
  }

  return (
    <AuthContext.Provider value={{ user, userData, loading, error, successMessage, login, signup, logout, sendPasswordReset, registerForEvent, updateUserProfile, updateUserPassword }}>
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
