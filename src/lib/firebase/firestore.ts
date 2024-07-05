import { db } from "@/lib/firebase/clientApp";
import {
  collection,
  onSnapshot,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  Timestamp,
  runTransaction,
  where,
  addDoc,
  getFirestore,
} from "firebase/firestore";

export async function addEvent(data: Object) {
  try {
    const myCollection = collection(db, "events");

    const newDocRef = await addDoc(myCollection, data);
    if (newDocRef.id) {
      return true;
      console.log("New document added with ID:", newDocRef.id);
    } else return false;
  } catch (e) {
    console.log(e);
  }
}
