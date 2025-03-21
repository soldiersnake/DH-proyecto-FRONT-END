// services/userService.ts
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

import { User } from "../types/user";
import { db } from "../firebase/firebase";

const usersCollection = collection(db, "users");

export const createUser = async (userData: User) => {
  const docRef = await addDoc(usersCollection, userData);
  return docRef.id;
};

export const getUsers = async () => {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
};

export const getUserByEmail = async (email: string) => {
  const q = query(usersCollection, where("email", "==", email));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
};
