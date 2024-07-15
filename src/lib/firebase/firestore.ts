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
  deleteDoc,
} from "firebase/firestore";
import { Event } from "@/interfaces/EventInterface";
export async function addEvent(data: Object) {
  try {
    const myCollection = collection(db, "events");

    const newDocRef = await addDoc(myCollection, data);
    if (newDocRef.id) {
      return true;
    } else return false;
  } catch (e) {
    console.log(e);
  }
}

export async function getEvents() {
  const querySnapshot = await getDocs(collection(db, "events"));
  const events: any = [];

  querySnapshot.forEach((doc) => {
    events.push({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate(),
    });
  });
  return events;
}

export async function deleteById(id: string) {
  await deleteDoc(doc(db, "events", id));
}

export async function updateEvent(values: Partial<Event>) {
  if (values.id) {
    const eventRef = doc(db, "events", values.id);
    await updateDoc(eventRef, { ...values });
  }
}
